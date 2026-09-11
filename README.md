# watn
A timeline of AI leaders’ musical chairs.

Updated September 10th, 2026.

[Latest data audit and sources](docs/data-audit-2026-09-10.md).

Link to a time range with `?from=2023` (January 2023 through the latest data).
Add `&to=2024` for a fixed range ending in December 2024, or use month precision
such as `?from=2024-06&to=2025-03`. Dates are clipped to the available history.
These parameters work with cohort and organization filters. Zooming and panning
update the URL; Copy link shares the visible range, rounded to include whole months.
Reset zoom removes the time range and restores the default view.

Social preview windows are curated per cohort in
[scripts/preview-windows.js](scripts/preview-windows.js), with the reason for each
choice. `bun run build` regenerates all 10 PNG cards and the matching share metadata.
