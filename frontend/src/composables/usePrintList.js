import { ref } from 'vue';
import { ElMessage } from 'element-plus';

function getCellText(row, column, formatters) {
  const value = row ? row[column.prop] : '';
  const formatter = formatters[column.prop];

  const displayValue =
    typeof formatter === 'function' ? formatter(value, row) : value;

  if (displayValue == null) return '';

  if (typeof displayValue === 'object') {
    return JSON.stringify(displayValue);
  }

  return String(displayValue);
}

function addText(doc, parent, tagName, text, className = '') {
  const element = doc.createElement(tagName);
  element.textContent = String(text ?? '');

  if (className) {
    element.className = className;
  }

  parent.appendChild(element);
  return element;
}

function buildPrintDocument(printWindow, options) {
  const { title, columns, rows, formatters } = options;
  const doc = printWindow.document;

  doc.open();
  doc.write(
    "<!doctype html><html lang='zh-CN'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1'></head><body></body></html>"
  );
  doc.close();

  doc.title = title;

  const style = doc.createElement('style');

  style.textContent = [
    '@page { size: A4 landscape; margin: 12mm; }',
    'body { margin: 0; color: #222; font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 10pt; }',
    'h1 { margin: 0 0 12px; text-align: center; font-size: 18pt; }',
    '.meta { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 9pt; }',
    'table { width: 100%; border-collapse: collapse; table-layout: auto; }',
    'thead { display: table-header-group; }',
    'tr { break-inside: avoid; page-break-inside: avoid; }',
    'th, td { border: 1px solid #777; padding: 6px 8px; text-align: left; vertical-align: top; overflow-wrap: anywhere; word-break: break-word; }',
    'th { background: #eee; font-weight: bold; }',
    '@media screen { body { padding: 24px; } }',
    '@media print { th { background: #eee !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; } }',
  ].join('\n');

  doc.head.appendChild(style);

  const printableColumns = columns.filter(
    (column) => column && column.prop && column.label
  );

  addText(doc, doc.body, 'h1', title);

  const meta = doc.createElement('div');
  meta.className = 'meta';

  addText(doc, meta, 'span', '记录数量：' + rows.length);

  addText(
    doc,
    meta,
    'span',
    '打印时间：' +
      new Date().toLocaleString('zh-CN', { hour12: false })
  );

  doc.body.appendChild(meta);

  const table = doc.createElement('table');
  const thead = doc.createElement('thead');
  const headerRow = doc.createElement('tr');

  printableColumns.forEach((column) => {
    addText(doc, headerRow, 'th', column.label);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = doc.createElement('tbody');

  if (rows.length === 0) {
    const tr = doc.createElement('tr');
    const td = addText(doc, tr, 'td', '没有符合条件的记录');
    td.colSpan = Math.max(printableColumns.length, 1);
    tbody.appendChild(tr);
  } else {
    rows.forEach((row) => {
      const tr = doc.createElement('tr');

      printableColumns.forEach((column) => {
        addText(
          doc,
          tr,
          'td',
          getCellText(row, column, formatters)
        );
      });

      tbody.appendChild(tr);
    });
  }

  table.appendChild(tbody);
  doc.body.appendChild(table);
}

export function usePrintList(options) {
  const {
    title,
    getList,
    searchForm,
    pagination,
    columns,
    formatters = {},
  } = options;

  const printLoading = ref(false);

  const handlePrint = async () => {
    const printWindow = window.open(
      '',
      '_blank',
      'width=1200,height=800'
    );

    if (!printWindow) {
      ElMessage.warning('打印窗口被拦截，请允许浏览器弹出窗口后重试');
      return;
    }

    printWindow.document.write(
      '<!doctype html><html><body>正在获取打印数据...</body></html>'
    );

    printLoading.value = true;

    try {
      const pageSize = Math.max(
        Number(pagination.pageSize) || 10,
        1
      );

      const rows = [];
      let page = 1;
      let total = 0;

      while (page === 1 || rows.length < total) {
        const result = await getList({
          ...searchForm,
          page,
          pageSize,
        });

        if (!Array.isArray(result?.list)) {
          throw new Error('列表接口未返回有效数据');
        }

        if (page === 1) {
          total = Number(result.total);

          if (!Number.isFinite(total) || total < 0) {
            total = result.list.length;
          }
        }

        if (result.list.length === 0) {
          break;
        }

        rows.push(...result.list);
        page += 1;
      }

      buildPrintDocument(printWindow, {
        title,
        columns,
        rows,
        formatters,
      });

      printWindow.setTimeout(() => {
        if (printWindow.closed) return;

        printWindow.focus();
        printWindow.print();
      }, 300);
    } catch (error) {
      printWindow.close();

      ElMessage.error(
        error?.response?.data?.message ||
          error?.message ||
          '获取打印数据失败'
      );
    } finally {
      printLoading.value = false;
    }
  };

  return {
    handlePrint,
    printLoading,
  };
}
