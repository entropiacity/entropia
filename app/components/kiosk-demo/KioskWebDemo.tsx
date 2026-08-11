'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { KioskDemoProvider, type KioskDemoActions } from './KioskDemoContext';
import { KioskDemoRouter } from './parts/KioskDemoRouter';
import { useKioskScrollContainment } from './useKioskScrollContainment';
import './kiosk-demo.css';

const FOCUS_TRANSITION_MS = 580;

type KioskWebDemoProps = {
  className?: string;
  autoFocusOnView?: boolean;
};

type Rect = { left: number; top: number; width: number; height: number };

function computeFocusedRect(): Rect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cap = vw >= 900 ? 420 : Infinity;
  const width = Math.min(vw * 0.92, vh * 0.92 * (9 / 16), cap);
  const height = width * (16 / 9);
  return {
    left: (vw - width) / 2,
    top: (vh - height) / 2,
    width,
    height,
  };
}

function scrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Mini web kiosk, portrait 9:16 frame, dummy menu & checkout (no backend).
 */
export function KioskWebDemo({ className = '', autoFocusOnView = false }: KioskWebDemoProps) {
  const [focused, setFocused] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const demoActionsRef = useRef<KioskDemoActions | null>(null);
  const startRectRef = useRef<Rect | null>(null);
  const pendingOrderNowRef = useRef(false);
  const animatingRef = useRef(false);
  const autoFocusedRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useKioskScrollContainment(wrapRef);

  const clearShellStyles = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.cssText = '';
    shell.classList.remove('kd-device-shell--focused');
  }, []);

  const exitFocus = useCallback(() => {
    setFocused(false);
    pendingOrderNowRef.current = false;
    animatingRef.current = false;
    startRectRef.current = null;
    clearShellStyles();
  }, [clearShellStyles]);

  const enterFocus = useCallback(
    (orderNow: boolean) => {
      const frame = frameRef.current;
      const wrap = wrapRef.current;
      if (!frame || !wrap || animatingRef.current || focused) return;

      const start = frame.getBoundingClientRect();
      startRectRef.current = {
        left: start.left,
        top: start.top,
        width: start.width,
        height: start.height,
      };
      setPlaceholderHeight(wrap.offsetHeight);
      pendingOrderNowRef.current = orderNow;
      animatingRef.current = true;
      setFocused(true);
    },
    [focused],
  );

  useEffect(() => {
    if (!autoFocusOnView) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (autoFocusedRef.current || !entry.isIntersecting) return;
        autoFocusedRef.current = true;
        obs.disconnect();
        window.setTimeout(() => enterFocus(true), 350);
      },
      { threshold: 0.4, rootMargin: '0px 0px -12% 0px' },
    );

    obs.observe(wrap);
    return () => obs.disconnect();
  }, [autoFocusOnView, enterFocus]);

  useLayoutEffect(() => {
    if (!focused) return;

    const shell = shellRef.current;
    const start = startRectRef.current;
    if (!shell || !start) return;

    const end = computeFocusedRect();

    shell.classList.add('kd-device-shell--focused');
    shell.style.position = 'fixed';
    shell.style.left = `${end.left}px`;
    shell.style.top = `${end.top}px`;
    shell.style.width = `${end.width}px`;
    shell.style.height = `${end.height}px`;
    shell.style.margin = '0';
    shell.style.zIndex = '9999';
    shell.style.maxWidth = 'none';
    shell.style.transformOrigin = 'top left';
    shell.style.willChange = 'transform';
    shell.style.backfaceVisibility = 'hidden';

    const dx = start.left - end.left;
    const dy = start.top - end.top;
    const sx = start.width / end.width;
    const sy = start.height / end.height;

    shell.style.transition = 'none';
    shell.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`;

    // Force style commit before animating
    void shell.offsetHeight;

    const onEnd = (e: TransitionEvent) => {
      if (e.target !== shell || e.propertyName !== 'transform') return;
      shell.style.willChange = 'auto';
      animatingRef.current = false;
      if (pendingOrderNowRef.current) {
        pendingOrderNowRef.current = false;
        demoActionsRef.current?.goToOrderType();
      }
      shell.removeEventListener('transitionend', onEnd);
    };

    shell.addEventListener('transitionend', onEnd);

    shell.style.transition = `transform ${FOCUS_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    shell.style.transform = 'translate3d(0, 0, 0) scale(1)';

    return () => shell.removeEventListener('transitionend', onEnd);
  }, [focused]);

  useEffect(() => {
    if (!focused) return;

    const sb = scrollbarWidth();
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (sb > 0) document.body.style.paddingRight = `${sb}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exitFocus();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener('keydown', onKey);
    };
  }, [focused, exitFocus]);

  const handleDemoActivate = useCallback(
    (e: React.PointerEvent) => {
      if (focused || animatingRef.current) return;

      const target = e.target as HTMLElement;
      const orderNow = target.closest('.kd-welcome-cta') !== null;

      if (orderNow) {
        e.preventDefault();
        e.stopPropagation();
      }

      enterFocus(orderNow);
    },
    [focused, enterFocus],
  );

  return (
    <>
      <div
        ref={wrapRef}
        className={`kd-device-wrap ${className}`.trim()}
        data-lenis-prevent
      >
        {focused && placeholderHeight > 0 ? (
          <div
            className="kd-device-placeholder"
            style={{ height: placeholderHeight }}
            aria-hidden
          />
        ) : null}

        <div ref={shellRef} className="kd-device-shell">
          <div
            ref={frameRef}
            className="kd-device-frame"
            data-lenis-prevent
            aria-label="Interactive kiosk demo"
            onPointerDownCapture={handleDemoActivate}
          >
            <div className="kd-device-notch" aria-hidden />
            <KioskDemoProvider actionsRef={demoActionsRef}>
              <div className="kd-device-screen">
                <KioskDemoRouter />
              </div>
            </KioskDemoProvider>
          </div>
          {!focused ? (
            <p className="kd-device-caption">Interactive demo</p>
          ) : null}
        </div>
      </div>

      {mounted && focused
        ? createPortal(
            <button
              type="button"
              className="kd-focus-backdrop"
              onClick={exitFocus}
              aria-label="Close expanded kiosk demo"
            />,
            document.body,
          )
        : null}
    </>
  );
}
