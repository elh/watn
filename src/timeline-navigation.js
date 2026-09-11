const MIN_ZOOM = 1;
const MAX_ZOOM = 24;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Keep the same date under the pointer. The pinned name column does not scale.
export function zoomAt({
  zoom,
  nextZoom,
  scrollLeft,
  anchor,
  nextAnchor = anchor,
  baseWidth,
  visibleWidth,
  minZoom = MIN_ZOOM,
  maxZoom = MAX_ZOOM,
}) {
  const scale = clamp(nextZoom, minZoom, maxZoom);
  const offset = (scrollLeft + anchor) * (scale / zoom) - nextAnchor;
  return {
    zoom: scale,
    scrollLeft: clamp(offset, 0, Math.max(0, baseWidth * scale - visibleWidth)),
  };
}

export function setupTimelineNavigation({
  viewport,
  timeline,
  onChange,
  onPanStart,
  initialRange = null,
  totalMonths,
}) {
  let zoom = 1;
  let baseWidth = 0;
  let gutter = 0;
  let visibleWidth = 0;
  let drag;
  let gesture;
  let pinch;
  let range = initialRange;
  let expectedScrollLeft = 0;

  const notify = () => onChange({ zoom, trackWidth: baseWidth * zoom, range });
  const captureRange = () => ({
    start: clamp(viewport.scrollLeft / (baseWidth * zoom), 0, 1),
    end: clamp((viewport.scrollLeft + visibleWidth) / (baseWidth * zoom), 0, 1),
  });
  const anchorAt = (clientX) =>
    clamp(
      clientX - viewport.getBoundingClientRect().left - gutter,
      0,
      visibleWidth,
    );
  const viewportCenter = () =>
    viewport.getBoundingClientRect().left + gutter + visibleWidth / 2;

  function renderRange() {
    zoom = range ? visibleWidth / (baseWidth * (range.end - range.start)) : 1;
    timeline.style.width = `${gutter + baseWidth * zoom}px`;
    viewport.scrollLeft = range ? range.start * baseWidth * zoom : 0;
    expectedScrollLeft = viewport.scrollLeft;
    notify();
  }

  function refresh() {
    if (!viewport.clientWidth) return;
    gutter = timeline
      .querySelector(".header-gutter")
      .getBoundingClientRect().width;
    visibleWidth = viewport.clientWidth - gutter;
    baseWidth =
      Math.max(
        viewport.clientWidth,
        parseFloat(
          getComputedStyle(timeline).getPropertyValue("--overview-width"),
        ),
      ) - gutter;
    renderRange();
  }

  function setZoom(nextZoom, clientX, origin) {
    if (!baseWidth || drag?.active) return;
    const next = zoomAt({
      zoom: origin?.zoom ?? zoom,
      nextZoom,
      scrollLeft: origin?.scrollLeft ?? viewport.scrollLeft,
      anchor: origin?.anchor ?? anchorAt(clientX),
      nextAnchor: anchorAt(clientX),
      baseWidth,
      visibleWidth,
      minZoom: Math.min(1, visibleWidth / baseWidth),
      maxZoom: Math.max(MAX_ZOOM, (visibleWidth / baseWidth) * totalMonths),
    });
    zoom = next.zoom;
    timeline.style.width = `${gutter + baseWidth * zoom}px`;
    // A moving pinch midpoint pans at the same time as it zooms.
    viewport.scrollLeft = next.scrollLeft;
    expectedScrollLeft = viewport.scrollLeft;
    range = captureRange();
    notify();
  }

  function setRange(nextRange) {
    range = nextRange;
    if (baseWidth && viewport.clientWidth) renderRange();
  }

  viewport.addEventListener(
    "scroll",
    () => {
      if (
        !baseWidth ||
        !viewport.clientWidth ||
        Math.abs(viewport.scrollLeft - expectedScrollLeft) < 1
      )
        return;
      expectedScrollLeft = viewport.scrollLeft;
      range = captureRange();
      notify();
    },
    { passive: true },
  );

  viewport.addEventListener(
    "wheel",
    (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      if (gesture || pinch) return;
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? viewport.clientHeight
            : 1;
      const delta = clamp(event.deltaY * unit, -300, 300);
      setZoom(zoom * Math.exp(-delta * 0.006), event.clientX);
    },
    { passive: false },
  );

  // Safari trackpads expose GestureEvents instead of Ctrl+wheel pinch events.
  viewport.addEventListener(
    "gesturestart",
    (event) => {
      event.preventDefault();
      gesture = {
        zoom,
        scrollLeft: viewport.scrollLeft,
        anchor: anchorAt(event.clientX),
      };
    },
    { passive: false },
  );
  viewport.addEventListener(
    "gesturechange",
    (event) => {
      event.preventDefault();
      if (gesture && !pinch)
        setZoom(gesture.zoom * event.scale, event.clientX, gesture);
    },
    { passive: false },
  );
  viewport.addEventListener(
    "gestureend",
    (event) => {
      event.preventDefault();
      gesture = undefined;
    },
    { passive: false },
  );

  const touchGeometry = (touches) => ({
    distance: Math.hypot(
      touches[1].clientX - touches[0].clientX,
      touches[1].clientY - touches[0].clientY,
    ),
    clientX: (touches[0].clientX + touches[1].clientX) / 2,
  });
  viewport.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 2) return;
      event.preventDefault();
      const { distance, clientX } = touchGeometry(event.touches);
      pinch = {
        zoom,
        scrollLeft: viewport.scrollLeft,
        anchor: anchorAt(clientX),
        distance: Math.max(1, distance),
      };
    },
    { passive: false },
  );
  viewport.addEventListener(
    "touchmove",
    (event) => {
      if (!pinch || event.touches.length !== 2) return;
      event.preventDefault();
      const { distance, clientX } = touchGeometry(event.touches);
      setZoom((pinch.zoom * distance) / pinch.distance, clientX, pinch);
    },
    { passive: false },
  );
  const endPinch = () => {
    pinch = undefined;
  };
  viewport.addEventListener("touchend", endPinch);
  viewport.addEventListener("touchcancel", endPinch);

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" || event.button !== 0 || !event.isPrimary)
      return;
    if (
      !event.target.closest(".track, .years") ||
      event.target.closest("button, a, input, select")
    )
      return;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      scrollLeft: viewport.scrollLeft,
      active: false,
    };
    viewport.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  viewport.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    if (!drag.active && Math.abs(delta) < 4) return;
    if (!drag.active) {
      drag.active = true;
      viewport.classList.add("is-panning");
      onPanStart();
    }
    viewport.scrollLeft = drag.scrollLeft - delta;
  });
  function endDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    drag = undefined;
    viewport.classList.remove("is-panning");
    if (viewport.hasPointerCapture(event.pointerId))
      viewport.releasePointerCapture(event.pointerId);
  }
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
  viewport.addEventListener("lostpointercapture", endDrag);

  viewport.addEventListener("keydown", (event) => {
    if (
      event.target !== viewport ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    )
      return;
    if (!["+", "=", "-", "0"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "0") setRange(null);
    else setZoom(zoom * (event.key === "-" ? 0.8 : 1.25), viewportCenter());
  });

  // Observe available space rather than the timeline width we change ourselves.
  timeline.style.minWidth = "0px";
  new ResizeObserver(refresh).observe(viewport);
  refresh();

  return {
    setRange,
    getRange() {
      return baseWidth &&
        viewport.clientWidth &&
        Math.abs(viewport.scrollLeft - expectedScrollLeft) >= 1
        ? captureRange()
        : range;
    },
    reset() {
      setRange(null);
    },
  };
}
