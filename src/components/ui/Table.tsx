import { ReactNode } from 'react';

export function Table({
  columns,
  data,
  renderActions
}: {
  columns: { key: string; header: string; width?: string }[];
  data: Record<string, ReactNode>[];
  renderActions?: (row: Record<string, any>) => ReactNode;
}) {
  return (
    <div className="glass" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: 'left', padding: '0.75rem', width: c.width }}>
                {c.header}
              </th>
            ))}
            {renderActions && <th style={{ padding: '0.75rem' }}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((c) => (
                <td key={c.key} style={{ padding: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  {row[c.key]}
                </td>
              ))}
              {renderActions && (
                <td style={{ padding: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

