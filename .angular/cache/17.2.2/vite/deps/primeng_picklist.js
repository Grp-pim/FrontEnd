import {
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleUpIcon,
  SearchIcon
} from "./chunk-IOQN56N6.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-OAGX7VO4.js";
import {
  AngleRightIcon
} from "./chunk-L6ZZ25KF.js";
import {
  BaseIcon
} from "./chunk-GPIS575M.js";
import {
  DomHandler,
  Ripple,
  RippleModule
} from "./chunk-LS63WCJA.js";
import {
  FilterService,
  ObjectUtils,
  PrimeNGConfig,
  PrimeTemplate,
  SharedModule,
  UniqueComponentId
} from "./chunk-XD4K24QK.js";
import {
  BidiModule,
  Directionality,
  Platform,
  RtlScrollAxisType,
  _getEventTarget,
  _getShadowRoot,
  coerceArray,
  coerceElement,
  coerceNumberProperty,
  getRtlScrollAxisType,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader,
  normalizePassiveListenerOptions,
  supportsScrollBehavior
} from "./chunk-UMHGXKDQ.js";
import {
  CommonModule,
  DOCUMENT,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-MBPM77QF.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  InputFlags,
  IterableDiffers,
  NgModule,
  NgZone,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  Self,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  booleanAttribute,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-N32JPPF6.js";
import {
  animationFrameScheduler,
  asapScheduler,
  fromEvent,
  isObservable,
  merge
} from "./chunk-VIDTC4F6.js";
import "./chunk-P2TDJQ7O.js";
import {
  BehaviorSubject,
  ConnectableObservable,
  Observable,
  Subject,
  Subscription,
  auditTime,
  distinctUntilChanged,
  filter,
  interval,
  map,
  of,
  pairwise,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from "./chunk-IV7WZ6OJ.js";
import "./chunk-WKYGNSYM.js";

// ../../node_modules/@angular/cdk/fesm2022/collections.mjs
var DataSource = class {
};
function isDataSource(value) {
  return value && typeof value.connect === "function" && !(value instanceof ConnectableObservable);
}
var ArrayDataSource = class extends DataSource {
  constructor(_data) {
    super();
    this._data = _data;
  }
  connect() {
    return isObservable(this._data) ? this._data : of(this._data);
  }
  disconnect() {
  }
};
var _ViewRepeaterOperation;
(function(_ViewRepeaterOperation2) {
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REPLACED"] = 0] = "REPLACED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["INSERTED"] = 1] = "INSERTED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["MOVED"] = 2] = "MOVED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REMOVED"] = 3] = "REMOVED";
})(_ViewRepeaterOperation || (_ViewRepeaterOperation = {}));
var _VIEW_REPEATER_STRATEGY = new InjectionToken("_ViewRepeater");
var _RecycleViewRepeaterStrategy = class {
  constructor() {
    this.viewCacheSize = 20;
    this._viewCache = [];
  }
  /** Apply changes to the DOM. */
  applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      let view;
      let operation;
      if (record.previousIndex == null) {
        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = view ? _ViewRepeaterOperation.INSERTED : _ViewRepeaterOperation.REPLACED;
      } else if (currentIndex == null) {
        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
        operation = _ViewRepeaterOperation.REMOVED;
      } else {
        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = _ViewRepeaterOperation.MOVED;
      }
      if (itemViewChanged) {
        itemViewChanged({
          context: view?.context,
          operation,
          record
        });
      }
    });
  }
  detach() {
    for (const view of this._viewCache) {
      view.destroy();
    }
    this._viewCache = [];
  }
  /**
   * Inserts a view for a new item, either from the cache or by creating a new
   * one. Returns `undefined` if the item was inserted into a cached view.
   */
  _insertView(viewArgsFactory, currentIndex, viewContainerRef, value) {
    const cachedView = this._insertViewFromCache(currentIndex, viewContainerRef);
    if (cachedView) {
      cachedView.context.$implicit = value;
      return void 0;
    }
    const viewArgs = viewArgsFactory();
    return viewContainerRef.createEmbeddedView(viewArgs.templateRef, viewArgs.context, viewArgs.index);
  }
  /** Detaches the view at the given index and inserts into the view cache. */
  _detachAndCacheView(index, viewContainerRef) {
    const detachedView = viewContainerRef.detach(index);
    this._maybeCacheView(detachedView, viewContainerRef);
  }
  /** Moves view at the previous index to the current index. */
  _moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, value) {
    const view = viewContainerRef.get(adjustedPreviousIndex);
    viewContainerRef.move(view, currentIndex);
    view.context.$implicit = value;
    return view;
  }
  /**
   * Cache the given detached view. If the cache is full, the view will be
   * destroyed.
   */
  _maybeCacheView(view, viewContainerRef) {
    if (this._viewCache.length < this.viewCacheSize) {
      this._viewCache.push(view);
    } else {
      const index = viewContainerRef.indexOf(view);
      if (index === -1) {
        view.destroy();
      } else {
        viewContainerRef.remove(index);
      }
    }
  }
  /** Inserts a recycled view from the cache at the given index. */
  _insertViewFromCache(index, viewContainerRef) {
    const cachedView = this._viewCache.pop();
    if (cachedView) {
      viewContainerRef.insert(cachedView, index);
    }
    return cachedView || null;
  }
};
var _UniqueSelectionDispatcher = class _UniqueSelectionDispatcher {
  constructor() {
    this._listeners = [];
  }
  /**
   * Notify other items that selection for the given name has been set.
   * @param id ID of the item.
   * @param name Name of the item.
   */
  notify(id, name) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }
  /**
   * Listen for future changes to item selection.
   * @return Function used to deregister listener
   */
  listen(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((registered) => {
        return listener !== registered;
      });
    };
  }
  ngOnDestroy() {
    this._listeners = [];
  }
};
_UniqueSelectionDispatcher.ɵfac = function UniqueSelectionDispatcher_Factory(t) {
  return new (t || _UniqueSelectionDispatcher)();
};
_UniqueSelectionDispatcher.ɵprov = ɵɵdefineInjectable({
  token: _UniqueSelectionDispatcher,
  factory: _UniqueSelectionDispatcher.ɵfac,
  providedIn: "root"
});
var UniqueSelectionDispatcher = _UniqueSelectionDispatcher;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniqueSelectionDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// ../../node_modules/@angular/cdk/fesm2022/scrolling.mjs
var _c0 = ["contentWrapper"];
var _c1 = ["*"];
var VIRTUAL_SCROLL_STRATEGY = new InjectionToken("VIRTUAL_SCROLL_STRATEGY");
var FixedSizeVirtualScrollStrategy = class {
  /**
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  constructor(itemSize, minBufferPx, maxBufferPx) {
    this._scrolledIndexChange = new Subject();
    this.scrolledIndexChange = this._scrolledIndexChange.pipe(distinctUntilChanged());
    this._viewport = null;
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
  }
  /**
   * Attaches this scroll strategy to a viewport.
   * @param viewport The viewport to attach this strategy to.
   */
  attach(viewport) {
    this._viewport = viewport;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** Detaches this scroll strategy from the currently attached viewport. */
  detach() {
    this._scrolledIndexChange.complete();
    this._viewport = null;
  }
  /**
   * Update the item size and buffer size.
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
    if (maxBufferPx < minBufferPx && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx");
    }
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentScrolled() {
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onDataLengthChanged() {
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentRendered() {
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onRenderedOffsetChanged() {
  }
  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  scrollToIndex(index, behavior) {
    if (this._viewport) {
      this._viewport.scrollToOffset(index * this._itemSize, behavior);
    }
  }
  /** Update the viewport's total content size. */
  _updateTotalContentSize() {
    if (!this._viewport) {
      return;
    }
    this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
  }
  /** Update the viewport's rendered range. */
  _updateRenderedRange() {
    if (!this._viewport) {
      return;
    }
    const renderedRange = this._viewport.getRenderedRange();
    const newRange = {
      start: renderedRange.start,
      end: renderedRange.end
    };
    const viewportSize = this._viewport.getViewportSize();
    const dataLength = this._viewport.getDataLength();
    let scrollOffset = this._viewport.measureScrollOffset();
    let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
    if (newRange.end > dataLength) {
      const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
      const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
      if (firstVisibleIndex != newVisibleIndex) {
        firstVisibleIndex = newVisibleIndex;
        scrollOffset = newVisibleIndex * this._itemSize;
        newRange.start = Math.floor(firstVisibleIndex);
      }
      newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
    }
    const startBuffer = scrollOffset - newRange.start * this._itemSize;
    if (startBuffer < this._minBufferPx && newRange.start != 0) {
      const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
    } else {
      const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
      if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
        }
      }
    }
    this._viewport.setRenderedRange(newRange);
    this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
    this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
  }
};
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
  return fixedSizeDir._scrollStrategy;
}
var _CdkFixedSizeVirtualScroll = class _CdkFixedSizeVirtualScroll {
  constructor() {
    this._itemSize = 20;
    this._minBufferPx = 100;
    this._maxBufferPx = 200;
    this._scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
  }
  /** The size of the items in the list (in pixels). */
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(value) {
    this._itemSize = coerceNumberProperty(value);
  }
  /**
   * The minimum amount of buffer rendered beyond the viewport (in pixels).
   * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
   */
  get minBufferPx() {
    return this._minBufferPx;
  }
  set minBufferPx(value) {
    this._minBufferPx = coerceNumberProperty(value);
  }
  /**
   * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
   */
  get maxBufferPx() {
    return this._maxBufferPx;
  }
  set maxBufferPx(value) {
    this._maxBufferPx = coerceNumberProperty(value);
  }
  ngOnChanges() {
    this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
  }
};
_CdkFixedSizeVirtualScroll.ɵfac = function CdkFixedSizeVirtualScroll_Factory(t) {
  return new (t || _CdkFixedSizeVirtualScroll)();
};
_CdkFixedSizeVirtualScroll.ɵdir = ɵɵdefineDirective({
  type: _CdkFixedSizeVirtualScroll,
  selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]],
  inputs: {
    itemSize: "itemSize",
    minBufferPx: "minBufferPx",
    maxBufferPx: "maxBufferPx"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useFactory: _fixedSizeVirtualScrollStrategyFactory,
    deps: [forwardRef(() => _CdkFixedSizeVirtualScroll)]
  }]), ɵɵNgOnChangesFeature]
});
var CdkFixedSizeVirtualScroll = _CdkFixedSizeVirtualScroll;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkFixedSizeVirtualScroll, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[itemSize]",
      standalone: true,
      providers: [{
        provide: VIRTUAL_SCROLL_STRATEGY,
        useFactory: _fixedSizeVirtualScrollStrategyFactory,
        deps: [forwardRef(() => CdkFixedSizeVirtualScroll)]
      }]
    }]
  }], null, {
    itemSize: [{
      type: Input
    }],
    minBufferPx: [{
      type: Input
    }],
    maxBufferPx: [{
      type: Input
    }]
  });
})();
var DEFAULT_SCROLL_TIME = 20;
var _ScrollDispatcher = class _ScrollDispatcher {
  constructor(_ngZone, _platform, document2) {
    this._ngZone = _ngZone;
    this._platform = _platform;
    this._scrolled = new Subject();
    this._globalSubscription = null;
    this._scrolledCount = 0;
    this.scrollContainers = /* @__PURE__ */ new Map();
    this._document = document2;
  }
  /**
   * Registers a scrollable instance with the service and listens for its scrolled events. When the
   * scrollable is scrolled, the service emits the event to its scrolled observable.
   * @param scrollable Scrollable instance to be registered.
   */
  register(scrollable) {
    if (!this.scrollContainers.has(scrollable)) {
      this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled.next(scrollable)));
    }
  }
  /**
   * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
   * @param scrollable Scrollable instance to be deregistered.
   */
  deregister(scrollable) {
    const scrollableReference = this.scrollContainers.get(scrollable);
    if (scrollableReference) {
      scrollableReference.unsubscribe();
      this.scrollContainers.delete(scrollable);
    }
  }
  /**
   * Returns an observable that emits an event whenever any of the registered Scrollable
   * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
   * to override the default "throttle" time.
   *
   * **Note:** in order to avoid hitting change detection for every scroll event,
   * all of the events emitted from this stream will be run outside the Angular zone.
   * If you need to update any data bindings as a result of a scroll event, you have
   * to run the callback using `NgZone.run`.
   */
  scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME) {
    if (!this._platform.isBrowser) {
      return of();
    }
    return new Observable((observer) => {
      if (!this._globalSubscription) {
        this._addGlobalListener();
      }
      const subscription = auditTimeInMs > 0 ? this._scrolled.pipe(auditTime(auditTimeInMs)).subscribe(observer) : this._scrolled.subscribe(observer);
      this._scrolledCount++;
      return () => {
        subscription.unsubscribe();
        this._scrolledCount--;
        if (!this._scrolledCount) {
          this._removeGlobalListener();
        }
      };
    });
  }
  ngOnDestroy() {
    this._removeGlobalListener();
    this.scrollContainers.forEach((_, container) => this.deregister(container));
    this._scrolled.complete();
  }
  /**
   * Returns an observable that emits whenever any of the
   * scrollable ancestors of an element are scrolled.
   * @param elementOrElementRef Element whose ancestors to listen for.
   * @param auditTimeInMs Time to throttle the scroll events.
   */
  ancestorScrolled(elementOrElementRef, auditTimeInMs) {
    const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
    return this.scrolled(auditTimeInMs).pipe(filter((target) => {
      return !target || ancestors.indexOf(target) > -1;
    }));
  }
  /** Returns all registered Scrollables that contain the provided element. */
  getAncestorScrollContainers(elementOrElementRef) {
    const scrollingContainers = [];
    this.scrollContainers.forEach((_subscription, scrollable) => {
      if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
        scrollingContainers.push(scrollable);
      }
    });
    return scrollingContainers;
  }
  /** Use defaultView of injected document if available or fallback to global window reference */
  _getWindow() {
    return this._document.defaultView || window;
  }
  /** Returns true if the element is contained within the provided Scrollable. */
  _scrollableContainsElement(scrollable, elementOrElementRef) {
    let element = coerceElement(elementOrElementRef);
    let scrollableElement = scrollable.getElementRef().nativeElement;
    do {
      if (element == scrollableElement) {
        return true;
      }
    } while (element = element.parentElement);
    return false;
  }
  /** Sets up the global scroll listeners. */
  _addGlobalListener() {
    this._globalSubscription = this._ngZone.runOutsideAngular(() => {
      const window2 = this._getWindow();
      return fromEvent(window2.document, "scroll").subscribe(() => this._scrolled.next());
    });
  }
  /** Cleans up the global scroll listener. */
  _removeGlobalListener() {
    if (this._globalSubscription) {
      this._globalSubscription.unsubscribe();
      this._globalSubscription = null;
    }
  }
};
_ScrollDispatcher.ɵfac = function ScrollDispatcher_Factory(t) {
  return new (t || _ScrollDispatcher)(ɵɵinject(NgZone), ɵɵinject(Platform), ɵɵinject(DOCUMENT, 8));
};
_ScrollDispatcher.ɵprov = ɵɵdefineInjectable({
  token: _ScrollDispatcher,
  factory: _ScrollDispatcher.ɵfac,
  providedIn: "root"
});
var ScrollDispatcher = _ScrollDispatcher;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var _CdkScrollable = class _CdkScrollable {
  constructor(elementRef, scrollDispatcher, ngZone, dir) {
    this.elementRef = elementRef;
    this.scrollDispatcher = scrollDispatcher;
    this.ngZone = ngZone;
    this.dir = dir;
    this._destroyed = new Subject();
    this._elementScrolled = new Observable((observer) => this.ngZone.runOutsideAngular(() => fromEvent(this.elementRef.nativeElement, "scroll").pipe(takeUntil(this._destroyed)).subscribe(observer)));
  }
  ngOnInit() {
    this.scrollDispatcher.register(this);
  }
  ngOnDestroy() {
    this.scrollDispatcher.deregister(this);
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Returns observable that emits when a scroll event is fired on the host element. */
  elementScrolled() {
    return this._elementScrolled;
  }
  /** Gets the ElementRef for the viewport. */
  getElementRef() {
    return this.elementRef;
  }
  /**
   * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
   * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param options specified the offsets to scroll to.
   */
  scrollTo(options) {
    const el = this.elementRef.nativeElement;
    const isRtl = this.dir && this.dir.value == "rtl";
    if (options.left == null) {
      options.left = isRtl ? options.end : options.start;
    }
    if (options.right == null) {
      options.right = isRtl ? options.start : options.end;
    }
    if (options.bottom != null) {
      options.top = el.scrollHeight - el.clientHeight - options.bottom;
    }
    if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
      if (options.left != null) {
        options.right = el.scrollWidth - el.clientWidth - options.left;
      }
      if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
        options.left = options.right;
      } else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
        options.left = options.right ? -options.right : options.right;
      }
    } else {
      if (options.right != null) {
        options.left = el.scrollWidth - el.clientWidth - options.right;
      }
    }
    this._applyScrollToOptions(options);
  }
  _applyScrollToOptions(options) {
    const el = this.elementRef.nativeElement;
    if (supportsScrollBehavior()) {
      el.scrollTo(options);
    } else {
      if (options.top != null) {
        el.scrollTop = options.top;
      }
      if (options.left != null) {
        el.scrollLeft = options.left;
      }
    }
  }
  /**
   * Measures the scroll offset relative to the specified edge of the viewport. This method can be
   * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
   * about what scrollLeft means in RTL. The values returned by this method are normalized such that
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param from The edge to measure from.
   */
  measureScrollOffset(from) {
    const LEFT = "left";
    const RIGHT = "right";
    const el = this.elementRef.nativeElement;
    if (from == "top") {
      return el.scrollTop;
    }
    if (from == "bottom") {
      return el.scrollHeight - el.clientHeight - el.scrollTop;
    }
    const isRtl = this.dir && this.dir.value == "rtl";
    if (from == "start") {
      from = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      from = isRtl ? LEFT : RIGHT;
    }
    if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
      if (from == LEFT) {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      } else {
        return el.scrollLeft;
      }
    } else if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
      if (from == LEFT) {
        return el.scrollLeft + el.scrollWidth - el.clientWidth;
      } else {
        return -el.scrollLeft;
      }
    } else {
      if (from == LEFT) {
        return el.scrollLeft;
      } else {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      }
    }
  }
};
_CdkScrollable.ɵfac = function CdkScrollable_Factory(t) {
  return new (t || _CdkScrollable)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ScrollDispatcher), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Directionality, 8));
};
_CdkScrollable.ɵdir = ɵɵdefineDirective({
  type: _CdkScrollable,
  selectors: [["", "cdk-scrollable", ""], ["", "cdkScrollable", ""]],
  standalone: true
});
var CdkScrollable = _CdkScrollable;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollable, [{
    type: Directive,
    args: [{
      selector: "[cdk-scrollable], [cdkScrollable]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var DEFAULT_RESIZE_TIME = 20;
var _ViewportRuler = class _ViewportRuler {
  constructor(_platform, ngZone, document2) {
    this._platform = _platform;
    this._change = new Subject();
    this._changeListener = (event) => {
      this._change.next(event);
    };
    this._document = document2;
    ngZone.runOutsideAngular(() => {
      if (_platform.isBrowser) {
        const window2 = this._getWindow();
        window2.addEventListener("resize", this._changeListener);
        window2.addEventListener("orientationchange", this._changeListener);
      }
      this.change().subscribe(() => this._viewportSize = null);
    });
  }
  ngOnDestroy() {
    if (this._platform.isBrowser) {
      const window2 = this._getWindow();
      window2.removeEventListener("resize", this._changeListener);
      window2.removeEventListener("orientationchange", this._changeListener);
    }
    this._change.complete();
  }
  /** Returns the viewport's width and height. */
  getViewportSize() {
    if (!this._viewportSize) {
      this._updateViewportSize();
    }
    const output = {
      width: this._viewportSize.width,
      height: this._viewportSize.height
    };
    if (!this._platform.isBrowser) {
      this._viewportSize = null;
    }
    return output;
  }
  /** Gets a DOMRect for the viewport's bounds. */
  getViewportRect() {
    const scrollPosition = this.getViewportScrollPosition();
    const {
      width,
      height
    } = this.getViewportSize();
    return {
      top: scrollPosition.top,
      left: scrollPosition.left,
      bottom: scrollPosition.top + height,
      right: scrollPosition.left + width,
      height,
      width
    };
  }
  /** Gets the (top, left) scroll position of the viewport. */
  getViewportScrollPosition() {
    if (!this._platform.isBrowser) {
      return {
        top: 0,
        left: 0
      };
    }
    const document2 = this._document;
    const window2 = this._getWindow();
    const documentElement = document2.documentElement;
    const documentRect = documentElement.getBoundingClientRect();
    const top = -documentRect.top || document2.body.scrollTop || window2.scrollY || documentElement.scrollTop || 0;
    const left = -documentRect.left || document2.body.scrollLeft || window2.scrollX || documentElement.scrollLeft || 0;
    return {
      top,
      left
    };
  }
  /**
   * Returns a stream that emits whenever the size of the viewport changes.
   * This stream emits outside of the Angular zone.
   * @param throttleTime Time in milliseconds to throttle the stream.
   */
  change(throttleTime = DEFAULT_RESIZE_TIME) {
    return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
  }
  /** Use defaultView of injected document if available or fallback to global window reference */
  _getWindow() {
    return this._document.defaultView || window;
  }
  /** Updates the cached viewport size. */
  _updateViewportSize() {
    const window2 = this._getWindow();
    this._viewportSize = this._platform.isBrowser ? {
      width: window2.innerWidth,
      height: window2.innerHeight
    } : {
      width: 0,
      height: 0
    };
  }
};
_ViewportRuler.ɵfac = function ViewportRuler_Factory(t) {
  return new (t || _ViewportRuler)(ɵɵinject(Platform), ɵɵinject(NgZone), ɵɵinject(DOCUMENT, 8));
};
_ViewportRuler.ɵprov = ɵɵdefineInjectable({
  token: _ViewportRuler,
  factory: _ViewportRuler.ɵfac,
  providedIn: "root"
});
var ViewportRuler = _ViewportRuler;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewportRuler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Platform
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var VIRTUAL_SCROLLABLE = new InjectionToken("VIRTUAL_SCROLLABLE");
var _CdkVirtualScrollable = class _CdkVirtualScrollable extends CdkScrollable {
  constructor(elementRef, scrollDispatcher, ngZone, dir) {
    super(elementRef, scrollDispatcher, ngZone, dir);
  }
  /**
   * Measure the viewport size for the provided orientation.
   *
   * @param orientation The orientation to measure the size from.
   */
  measureViewportSize(orientation) {
    const viewportEl = this.elementRef.nativeElement;
    return orientation === "horizontal" ? viewportEl.clientWidth : viewportEl.clientHeight;
  }
};
_CdkVirtualScrollable.ɵfac = function CdkVirtualScrollable_Factory(t) {
  return new (t || _CdkVirtualScrollable)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ScrollDispatcher), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Directionality, 8));
};
_CdkVirtualScrollable.ɵdir = ɵɵdefineDirective({
  type: _CdkVirtualScrollable,
  features: [ɵɵInheritDefinitionFeature]
});
var CdkVirtualScrollable = _CdkVirtualScrollable;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollable, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
function rangesEqual(r1, r2) {
  return r1.start == r2.start && r1.end == r2.end;
}
var SCROLL_SCHEDULER = typeof requestAnimationFrame !== "undefined" ? animationFrameScheduler : asapScheduler;
var _CdkVirtualScrollViewport = class _CdkVirtualScrollViewport extends CdkVirtualScrollable {
  /** The direction the viewport scrolls. */
  get orientation() {
    return this._orientation;
  }
  set orientation(orientation) {
    if (this._orientation !== orientation) {
      this._orientation = orientation;
      this._calculateSpacerSize();
    }
  }
  constructor(elementRef, _changeDetectorRef, ngZone, _scrollStrategy, dir, scrollDispatcher, viewportRuler, scrollable) {
    super(elementRef, scrollDispatcher, ngZone, dir);
    this.elementRef = elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._scrollStrategy = _scrollStrategy;
    this.scrollable = scrollable;
    this._platform = inject(Platform);
    this._detachedSubject = new Subject();
    this._renderedRangeSubject = new Subject();
    this._orientation = "vertical";
    this.appendOnly = false;
    this.scrolledIndexChange = new Observable((observer) => this._scrollStrategy.scrolledIndexChange.subscribe((index) => Promise.resolve().then(() => this.ngZone.run(() => observer.next(index)))));
    this.renderedRangeStream = this._renderedRangeSubject;
    this._totalContentSize = 0;
    this._totalContentWidth = "";
    this._totalContentHeight = "";
    this._renderedRange = {
      start: 0,
      end: 0
    };
    this._dataLength = 0;
    this._viewportSize = 0;
    this._renderedContentOffset = 0;
    this._renderedContentOffsetNeedsRewrite = false;
    this._isChangeDetectionPending = false;
    this._runAfterChangeDetection = [];
    this._viewportChanges = Subscription.EMPTY;
    if (!_scrollStrategy && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
    }
    this._viewportChanges = viewportRuler.change().subscribe(() => {
      this.checkViewportSize();
    });
    if (!this.scrollable) {
      this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable");
      this.scrollable = this;
    }
  }
  ngOnInit() {
    if (!this._platform.isBrowser) {
      return;
    }
    if (this.scrollable === this) {
      super.ngOnInit();
    }
    this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
      this._measureViewportSize();
      this._scrollStrategy.attach(this);
      this.scrollable.elementScrolled().pipe(
        // Start off with a fake scroll event so we properly detect our initial position.
        startWith(null),
        // Collect multiple events into one until the next animation frame. This way if
        // there are multiple scroll events in the same frame we only need to recheck
        // our layout once.
        auditTime(0, SCROLL_SCHEDULER),
        // Usually `elementScrolled` is completed when the scrollable is destroyed, but
        // that may not be the case if a `CdkVirtualScrollableElement` is used so we have
        // to unsubscribe here just in case.
        takeUntil(this._destroyed)
      ).subscribe(() => this._scrollStrategy.onContentScrolled());
      this._markChangeDetectionNeeded();
    }));
  }
  ngOnDestroy() {
    this.detach();
    this._scrollStrategy.detach();
    this._renderedRangeSubject.complete();
    this._detachedSubject.complete();
    this._viewportChanges.unsubscribe();
    super.ngOnDestroy();
  }
  /** Attaches a `CdkVirtualScrollRepeater` to this viewport. */
  attach(forOf) {
    if (this._forOf && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CdkVirtualScrollViewport is already attached.");
    }
    this.ngZone.runOutsideAngular(() => {
      this._forOf = forOf;
      this._forOf.dataStream.pipe(takeUntil(this._detachedSubject)).subscribe((data) => {
        const newLength = data.length;
        if (newLength !== this._dataLength) {
          this._dataLength = newLength;
          this._scrollStrategy.onDataLengthChanged();
        }
        this._doChangeDetection();
      });
    });
  }
  /** Detaches the current `CdkVirtualForOf`. */
  detach() {
    this._forOf = null;
    this._detachedSubject.next();
  }
  /** Gets the length of the data bound to this viewport (in number of items). */
  getDataLength() {
    return this._dataLength;
  }
  /** Gets the size of the viewport (in pixels). */
  getViewportSize() {
    return this._viewportSize;
  }
  // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
  // cycle happens. I'm being careful to only call it after the render cycle is complete and before
  // setting it to something else, but its error prone and should probably be split into
  // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
  /** Get the current rendered range of items. */
  getRenderedRange() {
    return this._renderedRange;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  /**
   * Sets the total size of all content (in pixels), including content that is not currently
   * rendered.
   */
  setTotalContentSize(size) {
    if (this._totalContentSize !== size) {
      this._totalContentSize = size;
      this._calculateSpacerSize();
      this._markChangeDetectionNeeded();
    }
  }
  /** Sets the currently rendered range of indices. */
  setRenderedRange(range) {
    if (!rangesEqual(this._renderedRange, range)) {
      if (this.appendOnly) {
        range = {
          start: 0,
          end: Math.max(this._renderedRange.end, range.end)
        };
      }
      this._renderedRangeSubject.next(this._renderedRange = range);
      this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
    }
  }
  /**
   * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
   */
  getOffsetToRenderedContentStart() {
    return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
  }
  /**
   * Sets the offset from the start of the viewport to either the start or end of the rendered data
   * (in pixels).
   */
  setRenderedContentOffset(offset, to = "to-start") {
    offset = this.appendOnly && to === "to-start" ? 0 : offset;
    const isRtl = this.dir && this.dir.value == "rtl";
    const isHorizontal = this.orientation == "horizontal";
    const axis = isHorizontal ? "X" : "Y";
    const axisDirection = isHorizontal && isRtl ? -1 : 1;
    let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
    this._renderedContentOffset = offset;
    if (to === "to-end") {
      transform += ` translate${axis}(-100%)`;
      this._renderedContentOffsetNeedsRewrite = true;
    }
    if (this._renderedContentTransform != transform) {
      this._renderedContentTransform = transform;
      this._markChangeDetectionNeeded(() => {
        if (this._renderedContentOffsetNeedsRewrite) {
          this._renderedContentOffset -= this.measureRenderedContentSize();
          this._renderedContentOffsetNeedsRewrite = false;
          this.setRenderedContentOffset(this._renderedContentOffset);
        } else {
          this._scrollStrategy.onRenderedOffsetChanged();
        }
      });
    }
  }
  /**
   * Scrolls to the given offset from the start of the viewport. Please note that this is not always
   * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
   * direction, this would be the equivalent of setting a fictional `scrollRight` property.
   * @param offset The offset to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
   */
  scrollToOffset(offset, behavior = "auto") {
    const options = {
      behavior
    };
    if (this.orientation === "horizontal") {
      options.start = offset;
    } else {
      options.top = offset;
    }
    this.scrollable.scrollTo(options);
  }
  /**
   * Scrolls to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
   */
  scrollToIndex(index, behavior = "auto") {
    this._scrollStrategy.scrollToIndex(index, behavior);
  }
  /**
   * Gets the current scroll offset from the start of the scrollable (in pixels).
   * @param from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
   *     in horizontal mode.
   */
  measureScrollOffset(from) {
    let measureScrollOffset;
    if (this.scrollable == this) {
      measureScrollOffset = (_from) => super.measureScrollOffset(_from);
    } else {
      measureScrollOffset = (_from) => this.scrollable.measureScrollOffset(_from);
    }
    return Math.max(0, measureScrollOffset(from ?? (this.orientation === "horizontal" ? "start" : "top")) - this.measureViewportOffset());
  }
  /**
   * Measures the offset of the viewport from the scrolling container
   * @param from The edge to measure from.
   */
  measureViewportOffset(from) {
    let fromRect;
    const LEFT = "left";
    const RIGHT = "right";
    const isRtl = this.dir?.value == "rtl";
    if (from == "start") {
      fromRect = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      fromRect = isRtl ? LEFT : RIGHT;
    } else if (from) {
      fromRect = from;
    } else {
      fromRect = this.orientation === "horizontal" ? "left" : "top";
    }
    const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
    const viewportClientRect = this.elementRef.nativeElement.getBoundingClientRect()[fromRect];
    return viewportClientRect - scrollerClientRect;
  }
  /** Measure the combined size of all of the rendered items. */
  measureRenderedContentSize() {
    const contentEl = this._contentWrapper.nativeElement;
    return this.orientation === "horizontal" ? contentEl.offsetWidth : contentEl.offsetHeight;
  }
  /**
   * Measure the total combined size of the given range. Throws if the range includes items that are
   * not rendered.
   */
  measureRangeSize(range) {
    if (!this._forOf) {
      return 0;
    }
    return this._forOf.measureRangeSize(range, this.orientation);
  }
  /** Update the viewport dimensions and re-render. */
  checkViewportSize() {
    this._measureViewportSize();
    this._scrollStrategy.onDataLengthChanged();
  }
  /** Measure the viewport size. */
  _measureViewportSize() {
    this._viewportSize = this.scrollable.measureViewportSize(this.orientation);
  }
  /** Queue up change detection to run. */
  _markChangeDetectionNeeded(runAfter) {
    if (runAfter) {
      this._runAfterChangeDetection.push(runAfter);
    }
    if (!this._isChangeDetectionPending) {
      this._isChangeDetectionPending = true;
      this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
        this._doChangeDetection();
      }));
    }
  }
  /** Run change detection. */
  _doChangeDetection() {
    this._isChangeDetectionPending = false;
    this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
    this.ngZone.run(() => this._changeDetectorRef.markForCheck());
    const runAfterChangeDetection = this._runAfterChangeDetection;
    this._runAfterChangeDetection = [];
    for (const fn of runAfterChangeDetection) {
      fn();
    }
  }
  /** Calculates the `style.width` and `style.height` for the spacer element. */
  _calculateSpacerSize() {
    this._totalContentHeight = this.orientation === "horizontal" ? "" : `${this._totalContentSize}px`;
    this._totalContentWidth = this.orientation === "horizontal" ? `${this._totalContentSize}px` : "";
  }
};
_CdkVirtualScrollViewport.ɵfac = function CdkVirtualScrollViewport_Factory(t) {
  return new (t || _CdkVirtualScrollViewport)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(VIRTUAL_SCROLL_STRATEGY, 8), ɵɵdirectiveInject(Directionality, 8), ɵɵdirectiveInject(ScrollDispatcher), ɵɵdirectiveInject(ViewportRuler), ɵɵdirectiveInject(VIRTUAL_SCROLLABLE, 8));
};
_CdkVirtualScrollViewport.ɵcmp = ɵɵdefineComponent({
  type: _CdkVirtualScrollViewport,
  selectors: [["cdk-virtual-scroll-viewport"]],
  viewQuery: function CdkVirtualScrollViewport_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._contentWrapper = _t.first);
    }
  },
  hostAttrs: [1, "cdk-virtual-scroll-viewport"],
  hostVars: 4,
  hostBindings: function CdkVirtualScrollViewport_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("cdk-virtual-scroll-orientation-horizontal", ctx.orientation === "horizontal")("cdk-virtual-scroll-orientation-vertical", ctx.orientation !== "horizontal");
    }
  },
  inputs: {
    orientation: "orientation",
    appendOnly: [InputFlags.HasDecoratorInputTransform, "appendOnly", "appendOnly", booleanAttribute]
  },
  outputs: {
    scrolledIndexChange: "scrolledIndexChange"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: CdkScrollable,
    useFactory: (virtualScrollable, viewport) => virtualScrollable || viewport,
    deps: [[new Optional(), new Inject(VIRTUAL_SCROLLABLE)], _CdkVirtualScrollViewport]
  }]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
  ngContentSelectors: _c1,
  decls: 4,
  vars: 4,
  consts: [[1, "cdk-virtual-scroll-content-wrapper"], ["contentWrapper", ""], [1, "cdk-virtual-scroll-spacer"]],
  template: function CdkVirtualScrollViewport_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0, 1);
      ɵɵprojection(2);
      ɵɵelementEnd();
      ɵɵelement(3, "div", 2);
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵstyleProp("width", ctx._totalContentWidth)("height", ctx._totalContentHeight);
    }
  },
  styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}"],
  encapsulation: 2,
  changeDetection: 0
});
var CdkVirtualScrollViewport = _CdkVirtualScrollViewport;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollViewport, [{
    type: Component,
    args: [{
      selector: "cdk-virtual-scroll-viewport",
      host: {
        "class": "cdk-virtual-scroll-viewport",
        "[class.cdk-virtual-scroll-orientation-horizontal]": 'orientation === "horizontal"',
        "[class.cdk-virtual-scroll-orientation-vertical]": 'orientation !== "horizontal"'
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      providers: [{
        provide: CdkScrollable,
        useFactory: (virtualScrollable, viewport) => virtualScrollable || viewport,
        deps: [[new Optional(), new Inject(VIRTUAL_SCROLLABLE)], CdkVirtualScrollViewport]
      }],
      template: '<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper class="cdk-virtual-scroll-content-wrapper">\n  <ng-content></ng-content>\n</div>\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div class="cdk-virtual-scroll-spacer"\n     [style.width]="_totalContentWidth" [style.height]="_totalContentHeight"></div>\n',
      styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [VIRTUAL_SCROLL_STRATEGY]
    }]
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ScrollDispatcher
  }, {
    type: ViewportRuler
  }, {
    type: CdkVirtualScrollable,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [VIRTUAL_SCROLLABLE]
    }]
  }], {
    orientation: [{
      type: Input
    }],
    appendOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrolledIndexChange: [{
      type: Output
    }],
    _contentWrapper: [{
      type: ViewChild,
      args: ["contentWrapper", {
        static: true
      }]
    }]
  });
})();
function getOffset(orientation, direction, node) {
  const el = node;
  if (!el.getBoundingClientRect) {
    return 0;
  }
  const rect = el.getBoundingClientRect();
  if (orientation === "horizontal") {
    return direction === "start" ? rect.left : rect.right;
  }
  return direction === "start" ? rect.top : rect.bottom;
}
var _CdkVirtualForOf = class _CdkVirtualForOf {
  /** The DataSource to display. */
  get cdkVirtualForOf() {
    return this._cdkVirtualForOf;
  }
  set cdkVirtualForOf(value) {
    this._cdkVirtualForOf = value;
    if (isDataSource(value)) {
      this._dataSourceChanges.next(value);
    } else {
      this._dataSourceChanges.next(new ArrayDataSource(isObservable(value) ? value : Array.from(value || [])));
    }
  }
  /**
   * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
   * the item and produces a value to be used as the item's identity when tracking changes.
   */
  get cdkVirtualForTrackBy() {
    return this._cdkVirtualForTrackBy;
  }
  set cdkVirtualForTrackBy(fn) {
    this._needsUpdate = true;
    this._cdkVirtualForTrackBy = fn ? (index, item) => fn(index + (this._renderedRange ? this._renderedRange.start : 0), item) : void 0;
  }
  /** The template used to stamp out new elements. */
  set cdkVirtualForTemplate(value) {
    if (value) {
      this._needsUpdate = true;
      this._template = value;
    }
  }
  /**
   * The size of the cache used to store templates that are not being used for re-use later.
   * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
   */
  get cdkVirtualForTemplateCacheSize() {
    return this._viewRepeater.viewCacheSize;
  }
  set cdkVirtualForTemplateCacheSize(size) {
    this._viewRepeater.viewCacheSize = coerceNumberProperty(size);
  }
  constructor(_viewContainerRef, _template, _differs, _viewRepeater, _viewport, ngZone) {
    this._viewContainerRef = _viewContainerRef;
    this._template = _template;
    this._differs = _differs;
    this._viewRepeater = _viewRepeater;
    this._viewport = _viewport;
    this.viewChange = new Subject();
    this._dataSourceChanges = new Subject();
    this.dataStream = this._dataSourceChanges.pipe(
      // Start off with null `DataSource`.
      startWith(null),
      // Bundle up the previous and current data sources so we can work with both.
      pairwise(),
      // Use `_changeDataSource` to disconnect from the previous data source and connect to the
      // new one, passing back a stream of data changes which we run through `switchMap` to give
      // us a data stream that emits the latest data from whatever the current `DataSource` is.
      switchMap(([prev, cur]) => this._changeDataSource(prev, cur)),
      // Replay the last emitted data when someone subscribes.
      shareReplay(1)
    );
    this._differ = null;
    this._needsUpdate = false;
    this._destroyed = new Subject();
    this.dataStream.subscribe((data) => {
      this._data = data;
      this._onRenderedDataChange();
    });
    this._viewport.renderedRangeStream.pipe(takeUntil(this._destroyed)).subscribe((range) => {
      this._renderedRange = range;
      if (this.viewChange.observers.length) {
        ngZone.run(() => this.viewChange.next(this._renderedRange));
      }
      this._onRenderedDataChange();
    });
    this._viewport.attach(this);
  }
  /**
   * Measures the combined size (width for horizontal orientation, height for vertical) of all items
   * in the specified range. Throws an error if the range includes items that are not currently
   * rendered.
   */
  measureRangeSize(range, orientation) {
    if (range.start >= range.end) {
      return 0;
    }
    if ((range.start < this._renderedRange.start || range.end > this._renderedRange.end) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Error: attempted to measure an item that isn't rendered.`);
    }
    const renderedStartIndex = range.start - this._renderedRange.start;
    const rangeLen = range.end - range.start;
    let firstNode;
    let lastNode;
    for (let i = 0; i < rangeLen; i++) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        firstNode = lastNode = view.rootNodes[0];
        break;
      }
    }
    for (let i = rangeLen - 1; i > -1; i--) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        lastNode = view.rootNodes[view.rootNodes.length - 1];
        break;
      }
    }
    return firstNode && lastNode ? getOffset(orientation, "end", lastNode) - getOffset(orientation, "start", firstNode) : 0;
  }
  ngDoCheck() {
    if (this._differ && this._needsUpdate) {
      const changes = this._differ.diff(this._renderedItems);
      if (!changes) {
        this._updateContext();
      } else {
        this._applyChanges(changes);
      }
      this._needsUpdate = false;
    }
  }
  ngOnDestroy() {
    this._viewport.detach();
    this._dataSourceChanges.next(void 0);
    this._dataSourceChanges.complete();
    this.viewChange.complete();
    this._destroyed.next();
    this._destroyed.complete();
    this._viewRepeater.detach();
  }
  /** React to scroll state changes in the viewport. */
  _onRenderedDataChange() {
    if (!this._renderedRange) {
      return;
    }
    this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
    if (!this._differ) {
      this._differ = this._differs.find(this._renderedItems).create((index, item) => {
        return this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(index, item) : item;
      });
    }
    this._needsUpdate = true;
  }
  /** Swap out one `DataSource` for another. */
  _changeDataSource(oldDs, newDs) {
    if (oldDs) {
      oldDs.disconnect(this);
    }
    this._needsUpdate = true;
    return newDs ? newDs.connect(this) : of();
  }
  /** Update the `CdkVirtualForOfContext` for all views. */
  _updateContext() {
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
      view.detectChanges();
    }
  }
  /** Apply changes to the DOM. */
  _applyChanges(changes) {
    this._viewRepeater.applyChanges(changes, this._viewContainerRef, (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), (record) => record.item);
    changes.forEachIdentityChange((record) => {
      const view = this._viewContainerRef.get(record.currentIndex);
      view.context.$implicit = record.item;
    });
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
    }
  }
  /** Update the computed properties on the `CdkVirtualForOfContext`. */
  _updateComputedContextProperties(context) {
    context.first = context.index === 0;
    context.last = context.index === context.count - 1;
    context.even = context.index % 2 === 0;
    context.odd = !context.even;
  }
  _getEmbeddedViewArgs(record, index) {
    return {
      templateRef: this._template,
      context: {
        $implicit: record.item,
        // It's guaranteed that the iterable is not "undefined" or "null" because we only
        // generate views for elements if the "cdkVirtualForOf" iterable has elements.
        cdkVirtualForOf: this._cdkVirtualForOf,
        index: -1,
        count: -1,
        first: false,
        last: false,
        odd: false,
        even: false
      },
      index
    };
  }
};
_CdkVirtualForOf.ɵfac = function CdkVirtualForOf_Factory(t) {
  return new (t || _CdkVirtualForOf)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(IterableDiffers), ɵɵdirectiveInject(_VIEW_REPEATER_STRATEGY), ɵɵdirectiveInject(CdkVirtualScrollViewport, 4), ɵɵdirectiveInject(NgZone));
};
_CdkVirtualForOf.ɵdir = ɵɵdefineDirective({
  type: _CdkVirtualForOf,
  selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]],
  inputs: {
    cdkVirtualForOf: "cdkVirtualForOf",
    cdkVirtualForTrackBy: "cdkVirtualForTrackBy",
    cdkVirtualForTemplate: "cdkVirtualForTemplate",
    cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: _VIEW_REPEATER_STRATEGY,
    useClass: _RecycleViewRepeaterStrategy
  }])]
});
var CdkVirtualForOf = _CdkVirtualForOf;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualForOf, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualFor][cdkVirtualForOf]",
      providers: [{
        provide: _VIEW_REPEATER_STRATEGY,
        useClass: _RecycleViewRepeaterStrategy
      }],
      standalone: true
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }, {
    type: IterableDiffers
  }, {
    type: _RecycleViewRepeaterStrategy,
    decorators: [{
      type: Inject,
      args: [_VIEW_REPEATER_STRATEGY]
    }]
  }, {
    type: CdkVirtualScrollViewport,
    decorators: [{
      type: SkipSelf
    }]
  }, {
    type: NgZone
  }], {
    cdkVirtualForOf: [{
      type: Input
    }],
    cdkVirtualForTrackBy: [{
      type: Input
    }],
    cdkVirtualForTemplate: [{
      type: Input
    }],
    cdkVirtualForTemplateCacheSize: [{
      type: Input
    }]
  });
})();
var _CdkVirtualScrollableElement = class _CdkVirtualScrollableElement extends CdkVirtualScrollable {
  constructor(elementRef, scrollDispatcher, ngZone, dir) {
    super(elementRef, scrollDispatcher, ngZone, dir);
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from] - this.measureScrollOffset(from);
  }
};
_CdkVirtualScrollableElement.ɵfac = function CdkVirtualScrollableElement_Factory(t) {
  return new (t || _CdkVirtualScrollableElement)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ScrollDispatcher), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Directionality, 8));
};
_CdkVirtualScrollableElement.ɵdir = ɵɵdefineDirective({
  type: _CdkVirtualScrollableElement,
  selectors: [["", "cdkVirtualScrollingElement", ""]],
  hostAttrs: [1, "cdk-virtual-scrollable"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: VIRTUAL_SCROLLABLE,
    useExisting: _CdkVirtualScrollableElement
  }]), ɵɵInheritDefinitionFeature]
});
var CdkVirtualScrollableElement = _CdkVirtualScrollableElement;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableElement, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualScrollingElement]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableElement
      }],
      standalone: true,
      host: {
        "class": "cdk-virtual-scrollable"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var _CdkVirtualScrollableWindow = class _CdkVirtualScrollableWindow extends CdkVirtualScrollable {
  constructor(scrollDispatcher, ngZone, dir) {
    super(new ElementRef(document.documentElement), scrollDispatcher, ngZone, dir);
    this._elementScrolled = new Observable((observer) => this.ngZone.runOutsideAngular(() => fromEvent(document, "scroll").pipe(takeUntil(this._destroyed)).subscribe(observer)));
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
};
_CdkVirtualScrollableWindow.ɵfac = function CdkVirtualScrollableWindow_Factory(t) {
  return new (t || _CdkVirtualScrollableWindow)(ɵɵdirectiveInject(ScrollDispatcher), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Directionality, 8));
};
_CdkVirtualScrollableWindow.ɵdir = ɵɵdefineDirective({
  type: _CdkVirtualScrollableWindow,
  selectors: [["cdk-virtual-scroll-viewport", "scrollWindow", ""]],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: VIRTUAL_SCROLLABLE,
    useExisting: _CdkVirtualScrollableWindow
  }]), ɵɵInheritDefinitionFeature]
});
var CdkVirtualScrollableWindow = _CdkVirtualScrollableWindow;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableWindow, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[scrollWindow]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableWindow
      }],
      standalone: true
    }]
  }], () => [{
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var _CdkScrollableModule = class _CdkScrollableModule {
};
_CdkScrollableModule.ɵfac = function CdkScrollableModule_Factory(t) {
  return new (t || _CdkScrollableModule)();
};
_CdkScrollableModule.ɵmod = ɵɵdefineNgModule({
  type: _CdkScrollableModule,
  imports: [CdkScrollable],
  exports: [CdkScrollable]
});
_CdkScrollableModule.ɵinj = ɵɵdefineInjector({});
var CdkScrollableModule = _CdkScrollableModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollableModule, [{
    type: NgModule,
    args: [{
      exports: [CdkScrollable],
      imports: [CdkScrollable]
    }]
  }], null, null);
})();
var _ScrollingModule = class _ScrollingModule {
};
_ScrollingModule.ɵfac = function ScrollingModule_Factory(t) {
  return new (t || _ScrollingModule)();
};
_ScrollingModule.ɵmod = ɵɵdefineNgModule({
  type: _ScrollingModule,
  imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
  exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
});
_ScrollingModule.ɵinj = ɵɵdefineInjector({
  imports: [BidiModule, CdkScrollableModule, BidiModule, CdkScrollableModule]
});
var ScrollingModule = _ScrollingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollingModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
      exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
    }]
  }], null, null);
})();

// ../../node_modules/@angular/cdk/fesm2022/drag-drop.mjs
function extendStyles(dest, source, importantProperties) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      const value = source[key];
      if (value) {
        dest.setProperty(key, value, importantProperties?.has(key) ? "important" : "");
      } else {
        dest.removeProperty(key);
      }
    }
  }
  return dest;
}
function toggleNativeDragInteractions(element, enable) {
  const userSelect = enable ? "" : "none";
  extendStyles(element.style, {
    "touch-action": enable ? "" : "none",
    "-webkit-user-drag": enable ? "" : "none",
    "-webkit-tap-highlight-color": enable ? "" : "transparent",
    "user-select": userSelect,
    "-ms-user-select": userSelect,
    "-webkit-user-select": userSelect,
    "-moz-user-select": userSelect
  });
}
function toggleVisibility(element, enable, importantProperties) {
  extendStyles(element.style, {
    position: enable ? "" : "fixed",
    top: enable ? "" : "0",
    opacity: enable ? "" : "0",
    left: enable ? "" : "-999em"
  }, importantProperties);
}
function combineTransforms(transform, initialTransform) {
  return initialTransform && initialTransform != "none" ? transform + " " + initialTransform : transform;
}
function parseCssTimeUnitsToMs(value) {
  const multiplier = value.toLowerCase().indexOf("ms") > -1 ? 1 : 1e3;
  return parseFloat(value) * multiplier;
}
function getTransformTransitionDurationInMs(element) {
  const computedStyle = getComputedStyle(element);
  const transitionedProperties = parseCssPropertyValue(computedStyle, "transition-property");
  const property = transitionedProperties.find((prop) => prop === "transform" || prop === "all");
  if (!property) {
    return 0;
  }
  const propertyIndex = transitionedProperties.indexOf(property);
  const rawDurations = parseCssPropertyValue(computedStyle, "transition-duration");
  const rawDelays = parseCssPropertyValue(computedStyle, "transition-delay");
  return parseCssTimeUnitsToMs(rawDurations[propertyIndex]) + parseCssTimeUnitsToMs(rawDelays[propertyIndex]);
}
function parseCssPropertyValue(computedStyle, name) {
  const value = computedStyle.getPropertyValue(name);
  return value.split(",").map((part) => part.trim());
}
function getMutableClientRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  };
}
function isInsideClientRect(clientRect, x, y) {
  const {
    top,
    bottom,
    left,
    right
  } = clientRect;
  return y >= top && y <= bottom && x >= left && x <= right;
}
function adjustDomRect(domRect, top, left) {
  domRect.top += top;
  domRect.bottom = domRect.top + domRect.height;
  domRect.left += left;
  domRect.right = domRect.left + domRect.width;
}
function isPointerNearDomRect(rect, threshold, pointerX, pointerY) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = rect;
  const xThreshold = width * threshold;
  const yThreshold = height * threshold;
  return pointerY > top - yThreshold && pointerY < bottom + yThreshold && pointerX > left - xThreshold && pointerX < right + xThreshold;
}
var ParentPositionTracker = class {
  constructor(_document) {
    this._document = _document;
    this.positions = /* @__PURE__ */ new Map();
  }
  /** Clears the cached positions. */
  clear() {
    this.positions.clear();
  }
  /** Caches the positions. Should be called at the beginning of a drag sequence. */
  cache(elements) {
    this.clear();
    this.positions.set(this._document, {
      scrollPosition: this.getViewportScrollPosition()
    });
    elements.forEach((element) => {
      this.positions.set(element, {
        scrollPosition: {
          top: element.scrollTop,
          left: element.scrollLeft
        },
        clientRect: getMutableClientRect(element)
      });
    });
  }
  /** Handles scrolling while a drag is taking place. */
  handleScroll(event) {
    const target = _getEventTarget(event);
    const cachedPosition = this.positions.get(target);
    if (!cachedPosition) {
      return null;
    }
    const scrollPosition = cachedPosition.scrollPosition;
    let newTop;
    let newLeft;
    if (target === this._document) {
      const viewportScrollPosition = this.getViewportScrollPosition();
      newTop = viewportScrollPosition.top;
      newLeft = viewportScrollPosition.left;
    } else {
      newTop = target.scrollTop;
      newLeft = target.scrollLeft;
    }
    const topDifference = scrollPosition.top - newTop;
    const leftDifference = scrollPosition.left - newLeft;
    this.positions.forEach((position, node) => {
      if (position.clientRect && target !== node && target.contains(node)) {
        adjustDomRect(position.clientRect, topDifference, leftDifference);
      }
    });
    scrollPosition.top = newTop;
    scrollPosition.left = newLeft;
    return {
      top: topDifference,
      left: leftDifference
    };
  }
  /**
   * Gets the scroll position of the viewport. Note that we use the scrollX and scrollY directly,
   * instead of going through the `ViewportRuler`, because the first value the ruler looks at is
   * the top/left offset of the `document.documentElement` which works for most cases, but breaks
   * if the element is offset by something like the `BlockScrollStrategy`.
   */
  getViewportScrollPosition() {
    return {
      top: window.scrollY,
      left: window.scrollX
    };
  }
};
function deepCloneNode(node) {
  const clone = node.cloneNode(true);
  const descendantsWithId = clone.querySelectorAll("[id]");
  const nodeName = node.nodeName.toLowerCase();
  clone.removeAttribute("id");
  for (let i = 0; i < descendantsWithId.length; i++) {
    descendantsWithId[i].removeAttribute("id");
  }
  if (nodeName === "canvas") {
    transferCanvasData(node, clone);
  } else if (nodeName === "input" || nodeName === "select" || nodeName === "textarea") {
    transferInputData(node, clone);
  }
  transferData("canvas", node, clone, transferCanvasData);
  transferData("input, textarea, select", node, clone, transferInputData);
  return clone;
}
function transferData(selector, node, clone, callback) {
  const descendantElements = node.querySelectorAll(selector);
  if (descendantElements.length) {
    const cloneElements = clone.querySelectorAll(selector);
    for (let i = 0; i < descendantElements.length; i++) {
      callback(descendantElements[i], cloneElements[i]);
    }
  }
}
var cloneUniqueId = 0;
function transferInputData(source, clone) {
  if (clone.type !== "file") {
    clone.value = source.value;
  }
  if (clone.type === "radio" && clone.name) {
    clone.name = `mat-clone-${clone.name}-${cloneUniqueId++}`;
  }
}
function transferCanvasData(source, clone) {
  const context = clone.getContext("2d");
  if (context) {
    try {
      context.drawImage(source, 0, 0);
    } catch {
    }
  }
}
var passiveEventListenerOptions = normalizePassiveListenerOptions({
  passive: true
});
var activeEventListenerOptions = normalizePassiveListenerOptions({
  passive: false
});
var MOUSE_EVENT_IGNORE_TIME = 800;
var dragImportantProperties = /* @__PURE__ */ new Set([
  // Needs to be important, because some `mat-table` sets `position: sticky !important`. See #22781.
  "position"
]);
var DragRef = class {
  /** Whether starting to drag this element is disabled. */
  get disabled() {
    return this._disabled || !!(this._dropContainer && this._dropContainer.disabled);
  }
  set disabled(value) {
    if (value !== this._disabled) {
      this._disabled = value;
      this._toggleNativeDragInteractions();
      this._handles.forEach((handle) => toggleNativeDragInteractions(handle, value));
    }
  }
  constructor(element, _config, _document, _ngZone, _viewportRuler, _dragDropRegistry) {
    this._config = _config;
    this._document = _document;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._dragDropRegistry = _dragDropRegistry;
    this._passiveTransform = {
      x: 0,
      y: 0
    };
    this._activeTransform = {
      x: 0,
      y: 0
    };
    this._hasStartedDragging = false;
    this._moveEvents = new Subject();
    this._pointerMoveSubscription = Subscription.EMPTY;
    this._pointerUpSubscription = Subscription.EMPTY;
    this._scrollSubscription = Subscription.EMPTY;
    this._resizeSubscription = Subscription.EMPTY;
    this._boundaryElement = null;
    this._nativeInteractionsEnabled = true;
    this._handles = [];
    this._disabledHandles = /* @__PURE__ */ new Set();
    this._direction = "ltr";
    this.dragStartDelay = 0;
    this._disabled = false;
    this.beforeStarted = new Subject();
    this.started = new Subject();
    this.released = new Subject();
    this.ended = new Subject();
    this.entered = new Subject();
    this.exited = new Subject();
    this.dropped = new Subject();
    this.moved = this._moveEvents;
    this._pointerDown = (event) => {
      this.beforeStarted.next();
      if (this._handles.length) {
        const targetHandle = this._getTargetHandle(event);
        if (targetHandle && !this._disabledHandles.has(targetHandle) && !this.disabled) {
          this._initializeDragSequence(targetHandle, event);
        }
      } else if (!this.disabled) {
        this._initializeDragSequence(this._rootElement, event);
      }
    };
    this._pointerMove = (event) => {
      const pointerPosition = this._getPointerPositionOnPage(event);
      if (!this._hasStartedDragging) {
        const distanceX = Math.abs(pointerPosition.x - this._pickupPositionOnPage.x);
        const distanceY = Math.abs(pointerPosition.y - this._pickupPositionOnPage.y);
        const isOverThreshold = distanceX + distanceY >= this._config.dragStartThreshold;
        if (isOverThreshold) {
          const isDelayElapsed = Date.now() >= this._dragStartTime + this._getDragStartDelay(event);
          const container = this._dropContainer;
          if (!isDelayElapsed) {
            this._endDragSequence(event);
            return;
          }
          if (!container || !container.isDragging() && !container.isReceiving()) {
            event.preventDefault();
            this._hasStartedDragging = true;
            this._ngZone.run(() => this._startDragSequence(event));
          }
        }
        return;
      }
      event.preventDefault();
      const constrainedPointerPosition = this._getConstrainedPointerPosition(pointerPosition);
      this._hasMoved = true;
      this._lastKnownPointerPosition = pointerPosition;
      this._updatePointerDirectionDelta(constrainedPointerPosition);
      if (this._dropContainer) {
        this._updateActiveDropContainer(constrainedPointerPosition, pointerPosition);
      } else {
        const offset = this.constrainPosition ? this._initialDomRect : this._pickupPositionOnPage;
        const activeTransform = this._activeTransform;
        activeTransform.x = constrainedPointerPosition.x - offset.x + this._passiveTransform.x;
        activeTransform.y = constrainedPointerPosition.y - offset.y + this._passiveTransform.y;
        this._applyRootElementTransform(activeTransform.x, activeTransform.y);
      }
      if (this._moveEvents.observers.length) {
        this._ngZone.run(() => {
          this._moveEvents.next({
            source: this,
            pointerPosition: constrainedPointerPosition,
            event,
            distance: this._getDragDistance(constrainedPointerPosition),
            delta: this._pointerDirectionDelta
          });
        });
      }
    };
    this._pointerUp = (event) => {
      this._endDragSequence(event);
    };
    this._nativeDragStart = (event) => {
      if (this._handles.length) {
        const targetHandle = this._getTargetHandle(event);
        if (targetHandle && !this._disabledHandles.has(targetHandle) && !this.disabled) {
          event.preventDefault();
        }
      } else if (!this.disabled) {
        event.preventDefault();
      }
    };
    this.withRootElement(element).withParent(_config.parentDragRef || null);
    this._parentPositions = new ParentPositionTracker(_document);
    _dragDropRegistry.registerDragItem(this);
  }
  /**
   * Returns the element that is being used as a placeholder
   * while the current element is being dragged.
   */
  getPlaceholderElement() {
    return this._placeholder;
  }
  /** Returns the root draggable element. */
  getRootElement() {
    return this._rootElement;
  }
  /**
   * Gets the currently-visible element that represents the drag item.
   * While dragging this is the placeholder, otherwise it's the root element.
   */
  getVisibleElement() {
    return this.isDragging() ? this.getPlaceholderElement() : this.getRootElement();
  }
  /** Registers the handles that can be used to drag the element. */
  withHandles(handles) {
    this._handles = handles.map((handle) => coerceElement(handle));
    this._handles.forEach((handle) => toggleNativeDragInteractions(handle, this.disabled));
    this._toggleNativeDragInteractions();
    const disabledHandles = /* @__PURE__ */ new Set();
    this._disabledHandles.forEach((handle) => {
      if (this._handles.indexOf(handle) > -1) {
        disabledHandles.add(handle);
      }
    });
    this._disabledHandles = disabledHandles;
    return this;
  }
  /**
   * Registers the template that should be used for the drag preview.
   * @param template Template that from which to stamp out the preview.
   */
  withPreviewTemplate(template) {
    this._previewTemplate = template;
    return this;
  }
  /**
   * Registers the template that should be used for the drag placeholder.
   * @param template Template that from which to stamp out the placeholder.
   */
  withPlaceholderTemplate(template) {
    this._placeholderTemplate = template;
    return this;
  }
  /**
   * Sets an alternate drag root element. The root element is the element that will be moved as
   * the user is dragging. Passing an alternate root element is useful when trying to enable
   * dragging on an element that you might not have access to.
   */
  withRootElement(rootElement) {
    const element = coerceElement(rootElement);
    if (element !== this._rootElement) {
      if (this._rootElement) {
        this._removeRootElementListeners(this._rootElement);
      }
      this._ngZone.runOutsideAngular(() => {
        element.addEventListener("mousedown", this._pointerDown, activeEventListenerOptions);
        element.addEventListener("touchstart", this._pointerDown, passiveEventListenerOptions);
        element.addEventListener("dragstart", this._nativeDragStart, activeEventListenerOptions);
      });
      this._initialTransform = void 0;
      this._rootElement = element;
    }
    if (typeof SVGElement !== "undefined" && this._rootElement instanceof SVGElement) {
      this._ownerSVGElement = this._rootElement.ownerSVGElement;
    }
    return this;
  }
  /**
   * Element to which the draggable's position will be constrained.
   */
  withBoundaryElement(boundaryElement) {
    this._boundaryElement = boundaryElement ? coerceElement(boundaryElement) : null;
    this._resizeSubscription.unsubscribe();
    if (boundaryElement) {
      this._resizeSubscription = this._viewportRuler.change(10).subscribe(() => this._containInsideBoundaryOnResize());
    }
    return this;
  }
  /** Sets the parent ref that the ref is nested in.  */
  withParent(parent) {
    this._parentDragRef = parent;
    return this;
  }
  /** Removes the dragging functionality from the DOM element. */
  dispose() {
    this._removeRootElementListeners(this._rootElement);
    if (this.isDragging()) {
      this._rootElement?.remove();
    }
    this._anchor?.remove();
    this._destroyPreview();
    this._destroyPlaceholder();
    this._dragDropRegistry.removeDragItem(this);
    this._removeSubscriptions();
    this.beforeStarted.complete();
    this.started.complete();
    this.released.complete();
    this.ended.complete();
    this.entered.complete();
    this.exited.complete();
    this.dropped.complete();
    this._moveEvents.complete();
    this._handles = [];
    this._disabledHandles.clear();
    this._dropContainer = void 0;
    this._resizeSubscription.unsubscribe();
    this._parentPositions.clear();
    this._boundaryElement = this._rootElement = this._ownerSVGElement = this._placeholderTemplate = this._previewTemplate = this._anchor = this._parentDragRef = null;
  }
  /** Checks whether the element is currently being dragged. */
  isDragging() {
    return this._hasStartedDragging && this._dragDropRegistry.isDragging(this);
  }
  /** Resets a standalone drag item to its initial position. */
  reset() {
    this._rootElement.style.transform = this._initialTransform || "";
    this._activeTransform = {
      x: 0,
      y: 0
    };
    this._passiveTransform = {
      x: 0,
      y: 0
    };
  }
  /**
   * Sets a handle as disabled. While a handle is disabled, it'll capture and interrupt dragging.
   * @param handle Handle element that should be disabled.
   */
  disableHandle(handle) {
    if (!this._disabledHandles.has(handle) && this._handles.indexOf(handle) > -1) {
      this._disabledHandles.add(handle);
      toggleNativeDragInteractions(handle, true);
    }
  }
  /**
   * Enables a handle, if it has been disabled.
   * @param handle Handle element to be enabled.
   */
  enableHandle(handle) {
    if (this._disabledHandles.has(handle)) {
      this._disabledHandles.delete(handle);
      toggleNativeDragInteractions(handle, this.disabled);
    }
  }
  /** Sets the layout direction of the draggable item. */
  withDirection(direction) {
    this._direction = direction;
    return this;
  }
  /** Sets the container that the item is part of. */
  _withDropContainer(container) {
    this._dropContainer = container;
  }
  /**
   * Gets the current position in pixels the draggable outside of a drop container.
   */
  getFreeDragPosition() {
    const position = this.isDragging() ? this._activeTransform : this._passiveTransform;
    return {
      x: position.x,
      y: position.y
    };
  }
  /**
   * Sets the current position in pixels the draggable outside of a drop container.
   * @param value New position to be set.
   */
  setFreeDragPosition(value) {
    this._activeTransform = {
      x: 0,
      y: 0
    };
    this._passiveTransform.x = value.x;
    this._passiveTransform.y = value.y;
    if (!this._dropContainer) {
      this._applyRootElementTransform(value.x, value.y);
    }
    return this;
  }
  /**
   * Sets the container into which to insert the preview element.
   * @param value Container into which to insert the preview.
   */
  withPreviewContainer(value) {
    this._previewContainer = value;
    return this;
  }
  /** Updates the item's sort order based on the last-known pointer position. */
  _sortFromLastPointerPosition() {
    const position = this._lastKnownPointerPosition;
    if (position && this._dropContainer) {
      this._updateActiveDropContainer(this._getConstrainedPointerPosition(position), position);
    }
  }
  /** Unsubscribes from the global subscriptions. */
  _removeSubscriptions() {
    this._pointerMoveSubscription.unsubscribe();
    this._pointerUpSubscription.unsubscribe();
    this._scrollSubscription.unsubscribe();
  }
  /** Destroys the preview element and its ViewRef. */
  _destroyPreview() {
    this._preview?.remove();
    this._previewRef?.destroy();
    this._preview = this._previewRef = null;
  }
  /** Destroys the placeholder element and its ViewRef. */
  _destroyPlaceholder() {
    this._placeholder?.remove();
    this._placeholderRef?.destroy();
    this._placeholder = this._placeholderRef = null;
  }
  /**
   * Clears subscriptions and stops the dragging sequence.
   * @param event Browser event object that ended the sequence.
   */
  _endDragSequence(event) {
    if (!this._dragDropRegistry.isDragging(this)) {
      return;
    }
    this._removeSubscriptions();
    this._dragDropRegistry.stopDragging(this);
    this._toggleNativeDragInteractions();
    if (this._handles) {
      this._rootElement.style.webkitTapHighlightColor = this._rootElementTapHighlight;
    }
    if (!this._hasStartedDragging) {
      return;
    }
    this.released.next({
      source: this,
      event
    });
    if (this._dropContainer) {
      this._dropContainer._stopScrolling();
      this._animatePreviewToPlaceholder().then(() => {
        this._cleanupDragArtifacts(event);
        this._cleanupCachedDimensions();
        this._dragDropRegistry.stopDragging(this);
      });
    } else {
      this._passiveTransform.x = this._activeTransform.x;
      const pointerPosition = this._getPointerPositionOnPage(event);
      this._passiveTransform.y = this._activeTransform.y;
      this._ngZone.run(() => {
        this.ended.next({
          source: this,
          distance: this._getDragDistance(pointerPosition),
          dropPoint: pointerPosition,
          event
        });
      });
      this._cleanupCachedDimensions();
      this._dragDropRegistry.stopDragging(this);
    }
  }
  /** Starts the dragging sequence. */
  _startDragSequence(event) {
    if (isTouchEvent(event)) {
      this._lastTouchEventTime = Date.now();
    }
    this._toggleNativeDragInteractions();
    const dropContainer = this._dropContainer;
    if (dropContainer) {
      const element = this._rootElement;
      const parent = element.parentNode;
      const placeholder = this._placeholder = this._createPlaceholderElement();
      const anchor = this._anchor = this._anchor || this._document.createComment("");
      const shadowRoot = this._getShadowRoot();
      parent.insertBefore(anchor, element);
      this._initialTransform = element.style.transform || "";
      this._preview = this._createPreviewElement();
      toggleVisibility(element, false, dragImportantProperties);
      this._document.body.appendChild(parent.replaceChild(placeholder, element));
      this._getPreviewInsertionPoint(parent, shadowRoot).appendChild(this._preview);
      this.started.next({
        source: this,
        event
      });
      dropContainer.start();
      this._initialContainer = dropContainer;
      this._initialIndex = dropContainer.getItemIndex(this);
    } else {
      this.started.next({
        source: this,
        event
      });
      this._initialContainer = this._initialIndex = void 0;
    }
    this._parentPositions.cache(dropContainer ? dropContainer.getScrollableParents() : []);
  }
  /**
   * Sets up the different variables and subscriptions
   * that will be necessary for the dragging sequence.
   * @param referenceElement Element that started the drag sequence.
   * @param event Browser event object that started the sequence.
   */
  _initializeDragSequence(referenceElement, event) {
    if (this._parentDragRef) {
      event.stopPropagation();
    }
    const isDragging = this.isDragging();
    const isTouchSequence = isTouchEvent(event);
    const isAuxiliaryMouseButton = !isTouchSequence && event.button !== 0;
    const rootElement = this._rootElement;
    const target = _getEventTarget(event);
    const isSyntheticEvent = !isTouchSequence && this._lastTouchEventTime && this._lastTouchEventTime + MOUSE_EVENT_IGNORE_TIME > Date.now();
    const isFakeEvent = isTouchSequence ? isFakeTouchstartFromScreenReader(event) : isFakeMousedownFromScreenReader(event);
    if (target && target.draggable && event.type === "mousedown") {
      event.preventDefault();
    }
    if (isDragging || isAuxiliaryMouseButton || isSyntheticEvent || isFakeEvent) {
      return;
    }
    if (this._handles.length) {
      const rootStyles = rootElement.style;
      this._rootElementTapHighlight = rootStyles.webkitTapHighlightColor || "";
      rootStyles.webkitTapHighlightColor = "transparent";
    }
    this._hasStartedDragging = this._hasMoved = false;
    this._removeSubscriptions();
    this._initialDomRect = this._rootElement.getBoundingClientRect();
    this._pointerMoveSubscription = this._dragDropRegistry.pointerMove.subscribe(this._pointerMove);
    this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp);
    this._scrollSubscription = this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe((scrollEvent) => this._updateOnScroll(scrollEvent));
    if (this._boundaryElement) {
      this._boundaryRect = getMutableClientRect(this._boundaryElement);
    }
    const previewTemplate = this._previewTemplate;
    this._pickupPositionInElement = previewTemplate && previewTemplate.template && !previewTemplate.matchSize ? {
      x: 0,
      y: 0
    } : this._getPointerPositionInElement(this._initialDomRect, referenceElement, event);
    const pointerPosition = this._pickupPositionOnPage = this._lastKnownPointerPosition = this._getPointerPositionOnPage(event);
    this._pointerDirectionDelta = {
      x: 0,
      y: 0
    };
    this._pointerPositionAtLastDirectionChange = {
      x: pointerPosition.x,
      y: pointerPosition.y
    };
    this._dragStartTime = Date.now();
    this._dragDropRegistry.startDragging(this, event);
  }
  /** Cleans up the DOM artifacts that were added to facilitate the element being dragged. */
  _cleanupDragArtifacts(event) {
    toggleVisibility(this._rootElement, true, dragImportantProperties);
    this._anchor.parentNode.replaceChild(this._rootElement, this._anchor);
    this._destroyPreview();
    this._destroyPlaceholder();
    this._initialDomRect = this._boundaryRect = this._previewRect = this._initialTransform = void 0;
    this._ngZone.run(() => {
      const container = this._dropContainer;
      const currentIndex = container.getItemIndex(this);
      const pointerPosition = this._getPointerPositionOnPage(event);
      const distance = this._getDragDistance(pointerPosition);
      const isPointerOverContainer = container._isOverContainer(pointerPosition.x, pointerPosition.y);
      this.ended.next({
        source: this,
        distance,
        dropPoint: pointerPosition,
        event
      });
      this.dropped.next({
        item: this,
        currentIndex,
        previousIndex: this._initialIndex,
        container,
        previousContainer: this._initialContainer,
        isPointerOverContainer,
        distance,
        dropPoint: pointerPosition,
        event
      });
      container.drop(this, currentIndex, this._initialIndex, this._initialContainer, isPointerOverContainer, distance, pointerPosition, event);
      this._dropContainer = this._initialContainer;
    });
  }
  /**
   * Updates the item's position in its drop container, or moves it
   * into a new one, depending on its current drag position.
   */
  _updateActiveDropContainer({
    x,
    y
  }, {
    x: rawX,
    y: rawY
  }) {
    let newContainer = this._initialContainer._getSiblingContainerFromPosition(this, x, y);
    if (!newContainer && this._dropContainer !== this._initialContainer && this._initialContainer._isOverContainer(x, y)) {
      newContainer = this._initialContainer;
    }
    if (newContainer && newContainer !== this._dropContainer) {
      this._ngZone.run(() => {
        this.exited.next({
          item: this,
          container: this._dropContainer
        });
        this._dropContainer.exit(this);
        this._dropContainer = newContainer;
        this._dropContainer.enter(this, x, y, newContainer === this._initialContainer && // If we're re-entering the initial container and sorting is disabled,
        // put item the into its starting index to begin with.
        newContainer.sortingDisabled ? this._initialIndex : void 0);
        this.entered.next({
          item: this,
          container: newContainer,
          currentIndex: newContainer.getItemIndex(this)
        });
      });
    }
    if (this.isDragging()) {
      this._dropContainer._startScrollingIfNecessary(rawX, rawY);
      this._dropContainer._sortItem(this, x, y, this._pointerDirectionDelta);
      if (this.constrainPosition) {
        this._applyPreviewTransform(x, y);
      } else {
        this._applyPreviewTransform(x - this._pickupPositionInElement.x, y - this._pickupPositionInElement.y);
      }
    }
  }
  /**
   * Creates the element that will be rendered next to the user's pointer
   * and will be used as a preview of the element that is being dragged.
   */
  _createPreviewElement() {
    const previewConfig = this._previewTemplate;
    const previewClass = this.previewClass;
    const previewTemplate = previewConfig ? previewConfig.template : null;
    let preview;
    if (previewTemplate && previewConfig) {
      const rootRect = previewConfig.matchSize ? this._initialDomRect : null;
      const viewRef = previewConfig.viewContainer.createEmbeddedView(previewTemplate, previewConfig.context);
      viewRef.detectChanges();
      preview = getRootNode(viewRef, this._document);
      this._previewRef = viewRef;
      if (previewConfig.matchSize) {
        matchElementSize(preview, rootRect);
      } else {
        preview.style.transform = getTransform(this._pickupPositionOnPage.x, this._pickupPositionOnPage.y);
      }
    } else {
      preview = deepCloneNode(this._rootElement);
      matchElementSize(preview, this._initialDomRect);
      if (this._initialTransform) {
        preview.style.transform = this._initialTransform;
      }
    }
    extendStyles(preview.style, {
      // It's important that we disable the pointer events on the preview, because
      // it can throw off the `document.elementFromPoint` calls in the `CdkDropList`.
      "pointer-events": "none",
      // We have to reset the margin, because it can throw off positioning relative to the viewport.
      "margin": "0",
      "position": "fixed",
      "top": "0",
      "left": "0",
      "z-index": `${this._config.zIndex || 1e3}`
    }, dragImportantProperties);
    toggleNativeDragInteractions(preview, false);
    preview.classList.add("cdk-drag-preview");
    preview.setAttribute("dir", this._direction);
    if (previewClass) {
      if (Array.isArray(previewClass)) {
        previewClass.forEach((className) => preview.classList.add(className));
      } else {
        preview.classList.add(previewClass);
      }
    }
    return preview;
  }
  /**
   * Animates the preview element from its current position to the location of the drop placeholder.
   * @returns Promise that resolves when the animation completes.
   */
  _animatePreviewToPlaceholder() {
    if (!this._hasMoved) {
      return Promise.resolve();
    }
    const placeholderRect = this._placeholder.getBoundingClientRect();
    this._preview.classList.add("cdk-drag-animating");
    this._applyPreviewTransform(placeholderRect.left, placeholderRect.top);
    const duration = getTransformTransitionDurationInMs(this._preview);
    if (duration === 0) {
      return Promise.resolve();
    }
    return this._ngZone.runOutsideAngular(() => {
      return new Promise((resolve) => {
        const handler = (event) => {
          if (!event || _getEventTarget(event) === this._preview && event.propertyName === "transform") {
            this._preview?.removeEventListener("transitionend", handler);
            resolve();
            clearTimeout(timeout);
          }
        };
        const timeout = setTimeout(handler, duration * 1.5);
        this._preview.addEventListener("transitionend", handler);
      });
    });
  }
  /** Creates an element that will be shown instead of the current element while dragging. */
  _createPlaceholderElement() {
    const placeholderConfig = this._placeholderTemplate;
    const placeholderTemplate = placeholderConfig ? placeholderConfig.template : null;
    let placeholder;
    if (placeholderTemplate) {
      this._placeholderRef = placeholderConfig.viewContainer.createEmbeddedView(placeholderTemplate, placeholderConfig.context);
      this._placeholderRef.detectChanges();
      placeholder = getRootNode(this._placeholderRef, this._document);
    } else {
      placeholder = deepCloneNode(this._rootElement);
    }
    placeholder.style.pointerEvents = "none";
    placeholder.classList.add("cdk-drag-placeholder");
    return placeholder;
  }
  /**
   * Figures out the coordinates at which an element was picked up.
   * @param referenceElement Element that initiated the dragging.
   * @param event Event that initiated the dragging.
   */
  _getPointerPositionInElement(elementRect, referenceElement, event) {
    const handleElement = referenceElement === this._rootElement ? null : referenceElement;
    const referenceRect = handleElement ? handleElement.getBoundingClientRect() : elementRect;
    const point = isTouchEvent(event) ? event.targetTouches[0] : event;
    const scrollPosition = this._getViewportScrollPosition();
    const x = point.pageX - referenceRect.left - scrollPosition.left;
    const y = point.pageY - referenceRect.top - scrollPosition.top;
    return {
      x: referenceRect.left - elementRect.left + x,
      y: referenceRect.top - elementRect.top + y
    };
  }
  /** Determines the point of the page that was touched by the user. */
  _getPointerPositionOnPage(event) {
    const scrollPosition = this._getViewportScrollPosition();
    const point = isTouchEvent(event) ? (
      // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
      // Also note that on real devices we're guaranteed for either `touches` or `changedTouches`
      // to have a value, but Firefox in device emulation mode has a bug where both can be empty
      // for `touchstart` and `touchend` so we fall back to a dummy object in order to avoid
      // throwing an error. The value returned here will be incorrect, but since this only
      // breaks inside a developer tool and the value is only used for secondary information,
      // we can get away with it. See https://bugzilla.mozilla.org/show_bug.cgi?id=1615824.
      event.touches[0] || event.changedTouches[0] || {
        pageX: 0,
        pageY: 0
      }
    ) : event;
    const x = point.pageX - scrollPosition.left;
    const y = point.pageY - scrollPosition.top;
    if (this._ownerSVGElement) {
      const svgMatrix = this._ownerSVGElement.getScreenCTM();
      if (svgMatrix) {
        const svgPoint = this._ownerSVGElement.createSVGPoint();
        svgPoint.x = x;
        svgPoint.y = y;
        return svgPoint.matrixTransform(svgMatrix.inverse());
      }
    }
    return {
      x,
      y
    };
  }
  /** Gets the pointer position on the page, accounting for any position constraints. */
  _getConstrainedPointerPosition(point) {
    const dropContainerLock = this._dropContainer ? this._dropContainer.lockAxis : null;
    let {
      x,
      y
    } = this.constrainPosition ? this.constrainPosition(point, this, this._initialDomRect, this._pickupPositionInElement) : point;
    if (this.lockAxis === "x" || dropContainerLock === "x") {
      y = this._pickupPositionOnPage.y - (this.constrainPosition ? this._pickupPositionInElement.y : 0);
    } else if (this.lockAxis === "y" || dropContainerLock === "y") {
      x = this._pickupPositionOnPage.x - (this.constrainPosition ? this._pickupPositionInElement.x : 0);
    }
    if (this._boundaryRect) {
      const {
        x: pickupX,
        y: pickupY
      } = !this.constrainPosition ? this._pickupPositionInElement : {
        x: 0,
        y: 0
      };
      const boundaryRect = this._boundaryRect;
      const {
        width: previewWidth,
        height: previewHeight
      } = this._getPreviewRect();
      const minY = boundaryRect.top + pickupY;
      const maxY = boundaryRect.bottom - (previewHeight - pickupY);
      const minX = boundaryRect.left + pickupX;
      const maxX = boundaryRect.right - (previewWidth - pickupX);
      x = clamp$1(x, minX, maxX);
      y = clamp$1(y, minY, maxY);
    }
    return {
      x,
      y
    };
  }
  /** Updates the current drag delta, based on the user's current pointer position on the page. */
  _updatePointerDirectionDelta(pointerPositionOnPage) {
    const {
      x,
      y
    } = pointerPositionOnPage;
    const delta = this._pointerDirectionDelta;
    const positionSinceLastChange = this._pointerPositionAtLastDirectionChange;
    const changeX = Math.abs(x - positionSinceLastChange.x);
    const changeY = Math.abs(y - positionSinceLastChange.y);
    if (changeX > this._config.pointerDirectionChangeThreshold) {
      delta.x = x > positionSinceLastChange.x ? 1 : -1;
      positionSinceLastChange.x = x;
    }
    if (changeY > this._config.pointerDirectionChangeThreshold) {
      delta.y = y > positionSinceLastChange.y ? 1 : -1;
      positionSinceLastChange.y = y;
    }
    return delta;
  }
  /** Toggles the native drag interactions, based on how many handles are registered. */
  _toggleNativeDragInteractions() {
    if (!this._rootElement || !this._handles) {
      return;
    }
    const shouldEnable = this._handles.length > 0 || !this.isDragging();
    if (shouldEnable !== this._nativeInteractionsEnabled) {
      this._nativeInteractionsEnabled = shouldEnable;
      toggleNativeDragInteractions(this._rootElement, shouldEnable);
    }
  }
  /** Removes the manually-added event listeners from the root element. */
  _removeRootElementListeners(element) {
    element.removeEventListener("mousedown", this._pointerDown, activeEventListenerOptions);
    element.removeEventListener("touchstart", this._pointerDown, passiveEventListenerOptions);
    element.removeEventListener("dragstart", this._nativeDragStart, activeEventListenerOptions);
  }
  /**
   * Applies a `transform` to the root element, taking into account any existing transforms on it.
   * @param x New transform value along the X axis.
   * @param y New transform value along the Y axis.
   */
  _applyRootElementTransform(x, y) {
    const transform = getTransform(x, y);
    const styles = this._rootElement.style;
    if (this._initialTransform == null) {
      this._initialTransform = styles.transform && styles.transform != "none" ? styles.transform : "";
    }
    styles.transform = combineTransforms(transform, this._initialTransform);
  }
  /**
   * Applies a `transform` to the preview, taking into account any existing transforms on it.
   * @param x New transform value along the X axis.
   * @param y New transform value along the Y axis.
   */
  _applyPreviewTransform(x, y) {
    const initialTransform = this._previewTemplate?.template ? void 0 : this._initialTransform;
    const transform = getTransform(x, y);
    this._preview.style.transform = combineTransforms(transform, initialTransform);
  }
  /**
   * Gets the distance that the user has dragged during the current drag sequence.
   * @param currentPosition Current position of the user's pointer.
   */
  _getDragDistance(currentPosition) {
    const pickupPosition = this._pickupPositionOnPage;
    if (pickupPosition) {
      return {
        x: currentPosition.x - pickupPosition.x,
        y: currentPosition.y - pickupPosition.y
      };
    }
    return {
      x: 0,
      y: 0
    };
  }
  /** Cleans up any cached element dimensions that we don't need after dragging has stopped. */
  _cleanupCachedDimensions() {
    this._boundaryRect = this._previewRect = void 0;
    this._parentPositions.clear();
  }
  /**
   * Checks whether the element is still inside its boundary after the viewport has been resized.
   * If not, the position is adjusted so that the element fits again.
   */
  _containInsideBoundaryOnResize() {
    let {
      x,
      y
    } = this._passiveTransform;
    if (x === 0 && y === 0 || this.isDragging() || !this._boundaryElement) {
      return;
    }
    const elementRect = this._rootElement.getBoundingClientRect();
    const boundaryRect = this._boundaryElement.getBoundingClientRect();
    if (boundaryRect.width === 0 && boundaryRect.height === 0 || elementRect.width === 0 && elementRect.height === 0) {
      return;
    }
    const leftOverflow = boundaryRect.left - elementRect.left;
    const rightOverflow = elementRect.right - boundaryRect.right;
    const topOverflow = boundaryRect.top - elementRect.top;
    const bottomOverflow = elementRect.bottom - boundaryRect.bottom;
    if (boundaryRect.width > elementRect.width) {
      if (leftOverflow > 0) {
        x += leftOverflow;
      }
      if (rightOverflow > 0) {
        x -= rightOverflow;
      }
    } else {
      x = 0;
    }
    if (boundaryRect.height > elementRect.height) {
      if (topOverflow > 0) {
        y += topOverflow;
      }
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
      }
    } else {
      y = 0;
    }
    if (x !== this._passiveTransform.x || y !== this._passiveTransform.y) {
      this.setFreeDragPosition({
        y,
        x
      });
    }
  }
  /** Gets the drag start delay, based on the event type. */
  _getDragStartDelay(event) {
    const value = this.dragStartDelay;
    if (typeof value === "number") {
      return value;
    } else if (isTouchEvent(event)) {
      return value.touch;
    }
    return value ? value.mouse : 0;
  }
  /** Updates the internal state of the draggable element when scrolling has occurred. */
  _updateOnScroll(event) {
    const scrollDifference = this._parentPositions.handleScroll(event);
    if (scrollDifference) {
      const target = _getEventTarget(event);
      if (this._boundaryRect && target !== this._boundaryElement && target.contains(this._boundaryElement)) {
        adjustDomRect(this._boundaryRect, scrollDifference.top, scrollDifference.left);
      }
      this._pickupPositionOnPage.x += scrollDifference.left;
      this._pickupPositionOnPage.y += scrollDifference.top;
      if (!this._dropContainer) {
        this._activeTransform.x -= scrollDifference.left;
        this._activeTransform.y -= scrollDifference.top;
        this._applyRootElementTransform(this._activeTransform.x, this._activeTransform.y);
      }
    }
  }
  /** Gets the scroll position of the viewport. */
  _getViewportScrollPosition() {
    return this._parentPositions.positions.get(this._document)?.scrollPosition || this._parentPositions.getViewportScrollPosition();
  }
  /**
   * Lazily resolves and returns the shadow root of the element. We do this in a function, rather
   * than saving it in property directly on init, because we want to resolve it as late as possible
   * in order to ensure that the element has been moved into the shadow DOM. Doing it inside the
   * constructor might be too early if the element is inside of something like `ngFor` or `ngIf`.
   */
  _getShadowRoot() {
    if (this._cachedShadowRoot === void 0) {
      this._cachedShadowRoot = _getShadowRoot(this._rootElement);
    }
    return this._cachedShadowRoot;
  }
  /** Gets the element into which the drag preview should be inserted. */
  _getPreviewInsertionPoint(initialParent, shadowRoot) {
    const previewContainer = this._previewContainer || "global";
    if (previewContainer === "parent") {
      return initialParent;
    }
    if (previewContainer === "global") {
      const documentRef = this._document;
      return shadowRoot || documentRef.fullscreenElement || documentRef.webkitFullscreenElement || documentRef.mozFullScreenElement || documentRef.msFullscreenElement || documentRef.body;
    }
    return coerceElement(previewContainer);
  }
  /** Lazily resolves and returns the dimensions of the preview. */
  _getPreviewRect() {
    if (!this._previewRect || !this._previewRect.width && !this._previewRect.height) {
      this._previewRect = this._preview ? this._preview.getBoundingClientRect() : this._initialDomRect;
    }
    return this._previewRect;
  }
  /** Gets a handle that is the target of an event. */
  _getTargetHandle(event) {
    return this._handles.find((handle) => {
      return event.target && (event.target === handle || handle.contains(event.target));
    });
  }
};
function getTransform(x, y) {
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
}
function clamp$1(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function isTouchEvent(event) {
  return event.type[0] === "t";
}
function getRootNode(viewRef, _document) {
  const rootNodes = viewRef.rootNodes;
  if (rootNodes.length === 1 && rootNodes[0].nodeType === _document.ELEMENT_NODE) {
    return rootNodes[0];
  }
  const wrapper = _document.createElement("div");
  rootNodes.forEach((node) => wrapper.appendChild(node));
  return wrapper;
}
function matchElementSize(target, sourceRect) {
  target.style.width = `${sourceRect.width}px`;
  target.style.height = `${sourceRect.height}px`;
  target.style.transform = getTransform(sourceRect.left, sourceRect.top);
}
function moveItemInArray(array, fromIndex, toIndex) {
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);
  if (from === to) {
    return;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
}
function transferArrayItem(currentArray, targetArray, currentIndex, targetIndex) {
  const from = clamp(currentIndex, currentArray.length - 1);
  const to = clamp(targetIndex, targetArray.length);
  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray.splice(from, 1)[0]);
  }
}
function clamp(value, max) {
  return Math.max(0, Math.min(max, value));
}
var SingleAxisSortStrategy = class {
  constructor(_element, _dragDropRegistry) {
    this._element = _element;
    this._dragDropRegistry = _dragDropRegistry;
    this._itemPositions = [];
    this.orientation = "vertical";
    this._previousSwap = {
      drag: null,
      delta: 0,
      overlaps: false
    };
  }
  /**
   * To be called when the drag sequence starts.
   * @param items Items that are currently in the list.
   */
  start(items) {
    this.withItems(items);
  }
  /**
   * To be called when an item is being sorted.
   * @param item Item to be sorted.
   * @param pointerX Position of the item along the X axis.
   * @param pointerY Position of the item along the Y axis.
   * @param pointerDelta Direction in which the pointer is moving along each axis.
   */
  sort(item, pointerX, pointerY, pointerDelta) {
    const siblings = this._itemPositions;
    const newIndex = this._getItemIndexFromPointerPosition(item, pointerX, pointerY, pointerDelta);
    if (newIndex === -1 && siblings.length > 0) {
      return null;
    }
    const isHorizontal = this.orientation === "horizontal";
    const currentIndex = siblings.findIndex((currentItem) => currentItem.drag === item);
    const siblingAtNewPosition = siblings[newIndex];
    const currentPosition = siblings[currentIndex].clientRect;
    const newPosition = siblingAtNewPosition.clientRect;
    const delta = currentIndex > newIndex ? 1 : -1;
    const itemOffset = this._getItemOffsetPx(currentPosition, newPosition, delta);
    const siblingOffset = this._getSiblingOffsetPx(currentIndex, siblings, delta);
    const oldOrder = siblings.slice();
    moveItemInArray(siblings, currentIndex, newIndex);
    siblings.forEach((sibling, index) => {
      if (oldOrder[index] === sibling) {
        return;
      }
      const isDraggedItem = sibling.drag === item;
      const offset = isDraggedItem ? itemOffset : siblingOffset;
      const elementToOffset = isDraggedItem ? item.getPlaceholderElement() : sibling.drag.getRootElement();
      sibling.offset += offset;
      if (isHorizontal) {
        elementToOffset.style.transform = combineTransforms(`translate3d(${Math.round(sibling.offset)}px, 0, 0)`, sibling.initialTransform);
        adjustDomRect(sibling.clientRect, 0, offset);
      } else {
        elementToOffset.style.transform = combineTransforms(`translate3d(0, ${Math.round(sibling.offset)}px, 0)`, sibling.initialTransform);
        adjustDomRect(sibling.clientRect, offset, 0);
      }
    });
    this._previousSwap.overlaps = isInsideClientRect(newPosition, pointerX, pointerY);
    this._previousSwap.drag = siblingAtNewPosition.drag;
    this._previousSwap.delta = isHorizontal ? pointerDelta.x : pointerDelta.y;
    return {
      previousIndex: currentIndex,
      currentIndex: newIndex
    };
  }
  /**
   * Called when an item is being moved into the container.
   * @param item Item that was moved into the container.
   * @param pointerX Position of the item along the X axis.
   * @param pointerY Position of the item along the Y axis.
   * @param index Index at which the item entered. If omitted, the container will try to figure it
   *   out automatically.
   */
  enter(item, pointerX, pointerY, index) {
    const newIndex = index == null || index < 0 ? (
      // We use the coordinates of where the item entered the drop
      // zone to figure out at which index it should be inserted.
      this._getItemIndexFromPointerPosition(item, pointerX, pointerY)
    ) : index;
    const activeDraggables = this._activeDraggables;
    const currentIndex = activeDraggables.indexOf(item);
    const placeholder = item.getPlaceholderElement();
    let newPositionReference = activeDraggables[newIndex];
    if (newPositionReference === item) {
      newPositionReference = activeDraggables[newIndex + 1];
    }
    if (!newPositionReference && (newIndex == null || newIndex === -1 || newIndex < activeDraggables.length - 1) && this._shouldEnterAsFirstChild(pointerX, pointerY)) {
      newPositionReference = activeDraggables[0];
    }
    if (currentIndex > -1) {
      activeDraggables.splice(currentIndex, 1);
    }
    if (newPositionReference && !this._dragDropRegistry.isDragging(newPositionReference)) {
      const element = newPositionReference.getRootElement();
      element.parentElement.insertBefore(placeholder, element);
      activeDraggables.splice(newIndex, 0, item);
    } else {
      coerceElement(this._element).appendChild(placeholder);
      activeDraggables.push(item);
    }
    placeholder.style.transform = "";
    this._cacheItemPositions();
  }
  /** Sets the items that are currently part of the list. */
  withItems(items) {
    this._activeDraggables = items.slice();
    this._cacheItemPositions();
  }
  /** Assigns a sort predicate to the strategy. */
  withSortPredicate(predicate) {
    this._sortPredicate = predicate;
  }
  /** Resets the strategy to its initial state before dragging was started. */
  reset() {
    this._activeDraggables.forEach((item) => {
      const rootElement = item.getRootElement();
      if (rootElement) {
        const initialTransform = this._itemPositions.find((p) => p.drag === item)?.initialTransform;
        rootElement.style.transform = initialTransform || "";
      }
    });
    this._itemPositions = [];
    this._activeDraggables = [];
    this._previousSwap.drag = null;
    this._previousSwap.delta = 0;
    this._previousSwap.overlaps = false;
  }
  /**
   * Gets a snapshot of items currently in the list.
   * Can include items that we dragged in from another list.
   */
  getActiveItemsSnapshot() {
    return this._activeDraggables;
  }
  /** Gets the index of a specific item. */
  getItemIndex(item) {
    const items = this.orientation === "horizontal" && this.direction === "rtl" ? this._itemPositions.slice().reverse() : this._itemPositions;
    return items.findIndex((currentItem) => currentItem.drag === item);
  }
  /** Used to notify the strategy that the scroll position has changed. */
  updateOnScroll(topDifference, leftDifference) {
    this._itemPositions.forEach(({
      clientRect
    }) => {
      adjustDomRect(clientRect, topDifference, leftDifference);
    });
    this._itemPositions.forEach(({
      drag
    }) => {
      if (this._dragDropRegistry.isDragging(drag)) {
        drag._sortFromLastPointerPosition();
      }
    });
  }
  /** Refreshes the position cache of the items and sibling containers. */
  _cacheItemPositions() {
    const isHorizontal = this.orientation === "horizontal";
    this._itemPositions = this._activeDraggables.map((drag) => {
      const elementToMeasure = drag.getVisibleElement();
      return {
        drag,
        offset: 0,
        initialTransform: elementToMeasure.style.transform || "",
        clientRect: getMutableClientRect(elementToMeasure)
      };
    }).sort((a, b) => {
      return isHorizontal ? a.clientRect.left - b.clientRect.left : a.clientRect.top - b.clientRect.top;
    });
  }
  /**
   * Gets the offset in pixels by which the item that is being dragged should be moved.
   * @param currentPosition Current position of the item.
   * @param newPosition Position of the item where the current item should be moved.
   * @param delta Direction in which the user is moving.
   */
  _getItemOffsetPx(currentPosition, newPosition, delta) {
    const isHorizontal = this.orientation === "horizontal";
    let itemOffset = isHorizontal ? newPosition.left - currentPosition.left : newPosition.top - currentPosition.top;
    if (delta === -1) {
      itemOffset += isHorizontal ? newPosition.width - currentPosition.width : newPosition.height - currentPosition.height;
    }
    return itemOffset;
  }
  /**
   * Gets the offset in pixels by which the items that aren't being dragged should be moved.
   * @param currentIndex Index of the item currently being dragged.
   * @param siblings All of the items in the list.
   * @param delta Direction in which the user is moving.
   */
  _getSiblingOffsetPx(currentIndex, siblings, delta) {
    const isHorizontal = this.orientation === "horizontal";
    const currentPosition = siblings[currentIndex].clientRect;
    const immediateSibling = siblings[currentIndex + delta * -1];
    let siblingOffset = currentPosition[isHorizontal ? "width" : "height"] * delta;
    if (immediateSibling) {
      const start = isHorizontal ? "left" : "top";
      const end = isHorizontal ? "right" : "bottom";
      if (delta === -1) {
        siblingOffset -= immediateSibling.clientRect[start] - currentPosition[end];
      } else {
        siblingOffset += currentPosition[start] - immediateSibling.clientRect[end];
      }
    }
    return siblingOffset;
  }
  /**
   * Checks if pointer is entering in the first position
   * @param pointerX Position of the user's pointer along the X axis.
   * @param pointerY Position of the user's pointer along the Y axis.
   */
  _shouldEnterAsFirstChild(pointerX, pointerY) {
    if (!this._activeDraggables.length) {
      return false;
    }
    const itemPositions = this._itemPositions;
    const isHorizontal = this.orientation === "horizontal";
    const reversed = itemPositions[0].drag !== this._activeDraggables[0];
    if (reversed) {
      const lastItemRect = itemPositions[itemPositions.length - 1].clientRect;
      return isHorizontal ? pointerX >= lastItemRect.right : pointerY >= lastItemRect.bottom;
    } else {
      const firstItemRect = itemPositions[0].clientRect;
      return isHorizontal ? pointerX <= firstItemRect.left : pointerY <= firstItemRect.top;
    }
  }
  /**
   * Gets the index of an item in the drop container, based on the position of the user's pointer.
   * @param item Item that is being sorted.
   * @param pointerX Position of the user's pointer along the X axis.
   * @param pointerY Position of the user's pointer along the Y axis.
   * @param delta Direction in which the user is moving their pointer.
   */
  _getItemIndexFromPointerPosition(item, pointerX, pointerY, delta) {
    const isHorizontal = this.orientation === "horizontal";
    const index = this._itemPositions.findIndex(({
      drag,
      clientRect
    }) => {
      if (drag === item) {
        return false;
      }
      if (delta) {
        const direction = isHorizontal ? delta.x : delta.y;
        if (drag === this._previousSwap.drag && this._previousSwap.overlaps && direction === this._previousSwap.delta) {
          return false;
        }
      }
      return isHorizontal ? (
        // Round these down since most browsers report client rects with
        // sub-pixel precision, whereas the pointer coordinates are rounded to pixels.
        pointerX >= Math.floor(clientRect.left) && pointerX < Math.floor(clientRect.right)
      ) : pointerY >= Math.floor(clientRect.top) && pointerY < Math.floor(clientRect.bottom);
    });
    return index === -1 || !this._sortPredicate(index, item) ? -1 : index;
  }
};
var DROP_PROXIMITY_THRESHOLD = 0.05;
var SCROLL_PROXIMITY_THRESHOLD = 0.05;
var AutoScrollVerticalDirection;
(function(AutoScrollVerticalDirection2) {
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["NONE"] = 0] = "NONE";
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["UP"] = 1] = "UP";
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["DOWN"] = 2] = "DOWN";
})(AutoScrollVerticalDirection || (AutoScrollVerticalDirection = {}));
var AutoScrollHorizontalDirection;
(function(AutoScrollHorizontalDirection2) {
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["NONE"] = 0] = "NONE";
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["LEFT"] = 1] = "LEFT";
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["RIGHT"] = 2] = "RIGHT";
})(AutoScrollHorizontalDirection || (AutoScrollHorizontalDirection = {}));
var DropListRef = class {
  constructor(element, _dragDropRegistry, _document, _ngZone, _viewportRuler) {
    this._dragDropRegistry = _dragDropRegistry;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this.disabled = false;
    this.sortingDisabled = false;
    this.autoScrollDisabled = false;
    this.autoScrollStep = 2;
    this.enterPredicate = () => true;
    this.sortPredicate = () => true;
    this.beforeStarted = new Subject();
    this.entered = new Subject();
    this.exited = new Subject();
    this.dropped = new Subject();
    this.sorted = new Subject();
    this.receivingStarted = new Subject();
    this.receivingStopped = new Subject();
    this._isDragging = false;
    this._draggables = [];
    this._siblings = [];
    this._activeSiblings = /* @__PURE__ */ new Set();
    this._viewportScrollSubscription = Subscription.EMPTY;
    this._verticalScrollDirection = AutoScrollVerticalDirection.NONE;
    this._horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
    this._stopScrollTimers = new Subject();
    this._cachedShadowRoot = null;
    this._startScrollInterval = () => {
      this._stopScrolling();
      interval(0, animationFrameScheduler).pipe(takeUntil(this._stopScrollTimers)).subscribe(() => {
        const node = this._scrollNode;
        const scrollStep = this.autoScrollStep;
        if (this._verticalScrollDirection === AutoScrollVerticalDirection.UP) {
          node.scrollBy(0, -scrollStep);
        } else if (this._verticalScrollDirection === AutoScrollVerticalDirection.DOWN) {
          node.scrollBy(0, scrollStep);
        }
        if (this._horizontalScrollDirection === AutoScrollHorizontalDirection.LEFT) {
          node.scrollBy(-scrollStep, 0);
        } else if (this._horizontalScrollDirection === AutoScrollHorizontalDirection.RIGHT) {
          node.scrollBy(scrollStep, 0);
        }
      });
    };
    this.element = coerceElement(element);
    this._document = _document;
    this.withScrollableParents([this.element]);
    _dragDropRegistry.registerDropContainer(this);
    this._parentPositions = new ParentPositionTracker(_document);
    this._sortStrategy = new SingleAxisSortStrategy(this.element, _dragDropRegistry);
    this._sortStrategy.withSortPredicate((index, item) => this.sortPredicate(index, item, this));
  }
  /** Removes the drop list functionality from the DOM element. */
  dispose() {
    this._stopScrolling();
    this._stopScrollTimers.complete();
    this._viewportScrollSubscription.unsubscribe();
    this.beforeStarted.complete();
    this.entered.complete();
    this.exited.complete();
    this.dropped.complete();
    this.sorted.complete();
    this.receivingStarted.complete();
    this.receivingStopped.complete();
    this._activeSiblings.clear();
    this._scrollNode = null;
    this._parentPositions.clear();
    this._dragDropRegistry.removeDropContainer(this);
  }
  /** Whether an item from this list is currently being dragged. */
  isDragging() {
    return this._isDragging;
  }
  /** Starts dragging an item. */
  start() {
    this._draggingStarted();
    this._notifyReceivingSiblings();
  }
  /**
   * Attempts to move an item into the container.
   * @param item Item that was moved into the container.
   * @param pointerX Position of the item along the X axis.
   * @param pointerY Position of the item along the Y axis.
   * @param index Index at which the item entered. If omitted, the container will try to figure it
   *   out automatically.
   */
  enter(item, pointerX, pointerY, index) {
    this._draggingStarted();
    if (index == null && this.sortingDisabled) {
      index = this._draggables.indexOf(item);
    }
    this._sortStrategy.enter(item, pointerX, pointerY, index);
    this._cacheParentPositions();
    this._notifyReceivingSiblings();
    this.entered.next({
      item,
      container: this,
      currentIndex: this.getItemIndex(item)
    });
  }
  /**
   * Removes an item from the container after it was dragged into another container by the user.
   * @param item Item that was dragged out.
   */
  exit(item) {
    this._reset();
    this.exited.next({
      item,
      container: this
    });
  }
  /**
   * Drops an item into this container.
   * @param item Item being dropped into the container.
   * @param currentIndex Index at which the item should be inserted.
   * @param previousIndex Index of the item when dragging started.
   * @param previousContainer Container from which the item got dragged in.
   * @param isPointerOverContainer Whether the user's pointer was over the
   *    container when the item was dropped.
   * @param distance Distance the user has dragged since the start of the dragging sequence.
   * @param event Event that triggered the dropping sequence.
   *
   * @breaking-change 15.0.0 `previousIndex` and `event` parameters to become required.
   */
  drop(item, currentIndex, previousIndex, previousContainer, isPointerOverContainer, distance, dropPoint, event = {}) {
    this._reset();
    this.dropped.next({
      item,
      currentIndex,
      previousIndex,
      container: this,
      previousContainer,
      isPointerOverContainer,
      distance,
      dropPoint,
      event
    });
  }
  /**
   * Sets the draggable items that are a part of this list.
   * @param items Items that are a part of this list.
   */
  withItems(items) {
    const previousItems = this._draggables;
    this._draggables = items;
    items.forEach((item) => item._withDropContainer(this));
    if (this.isDragging()) {
      const draggedItems = previousItems.filter((item) => item.isDragging());
      if (draggedItems.every((item) => items.indexOf(item) === -1)) {
        this._reset();
      } else {
        this._sortStrategy.withItems(this._draggables);
      }
    }
    return this;
  }
  /** Sets the layout direction of the drop list. */
  withDirection(direction) {
    this._sortStrategy.direction = direction;
    return this;
  }
  /**
   * Sets the containers that are connected to this one. When two or more containers are
   * connected, the user will be allowed to transfer items between them.
   * @param connectedTo Other containers that the current containers should be connected to.
   */
  connectedTo(connectedTo) {
    this._siblings = connectedTo.slice();
    return this;
  }
  /**
   * Sets the orientation of the container.
   * @param orientation New orientation for the container.
   */
  withOrientation(orientation) {
    this._sortStrategy.orientation = orientation;
    return this;
  }
  /**
   * Sets which parent elements are can be scrolled while the user is dragging.
   * @param elements Elements that can be scrolled.
   */
  withScrollableParents(elements) {
    const element = coerceElement(this.element);
    this._scrollableElements = elements.indexOf(element) === -1 ? [element, ...elements] : elements.slice();
    return this;
  }
  /** Gets the scrollable parents that are registered with this drop container. */
  getScrollableParents() {
    return this._scrollableElements;
  }
  /**
   * Figures out the index of an item in the container.
   * @param item Item whose index should be determined.
   */
  getItemIndex(item) {
    return this._isDragging ? this._sortStrategy.getItemIndex(item) : this._draggables.indexOf(item);
  }
  /**
   * Whether the list is able to receive the item that
   * is currently being dragged inside a connected drop list.
   */
  isReceiving() {
    return this._activeSiblings.size > 0;
  }
  /**
   * Sorts an item inside the container based on its position.
   * @param item Item to be sorted.
   * @param pointerX Position of the item along the X axis.
   * @param pointerY Position of the item along the Y axis.
   * @param pointerDelta Direction in which the pointer is moving along each axis.
   */
  _sortItem(item, pointerX, pointerY, pointerDelta) {
    if (this.sortingDisabled || !this._domRect || !isPointerNearDomRect(this._domRect, DROP_PROXIMITY_THRESHOLD, pointerX, pointerY)) {
      return;
    }
    const result = this._sortStrategy.sort(item, pointerX, pointerY, pointerDelta);
    if (result) {
      this.sorted.next({
        previousIndex: result.previousIndex,
        currentIndex: result.currentIndex,
        container: this,
        item
      });
    }
  }
  /**
   * Checks whether the user's pointer is close to the edges of either the
   * viewport or the drop list and starts the auto-scroll sequence.
   * @param pointerX User's pointer position along the x axis.
   * @param pointerY User's pointer position along the y axis.
   */
  _startScrollingIfNecessary(pointerX, pointerY) {
    if (this.autoScrollDisabled) {
      return;
    }
    let scrollNode;
    let verticalScrollDirection = AutoScrollVerticalDirection.NONE;
    let horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
    this._parentPositions.positions.forEach((position, element) => {
      if (element === this._document || !position.clientRect || scrollNode) {
        return;
      }
      if (isPointerNearDomRect(position.clientRect, DROP_PROXIMITY_THRESHOLD, pointerX, pointerY)) {
        [verticalScrollDirection, horizontalScrollDirection] = getElementScrollDirections(element, position.clientRect, this._sortStrategy.direction, pointerX, pointerY);
        if (verticalScrollDirection || horizontalScrollDirection) {
          scrollNode = element;
        }
      }
    });
    if (!verticalScrollDirection && !horizontalScrollDirection) {
      const {
        width,
        height
      } = this._viewportRuler.getViewportSize();
      const domRect = {
        width,
        height,
        top: 0,
        right: width,
        bottom: height,
        left: 0
      };
      verticalScrollDirection = getVerticalScrollDirection(domRect, pointerY);
      horizontalScrollDirection = getHorizontalScrollDirection(domRect, pointerX);
      scrollNode = window;
    }
    if (scrollNode && (verticalScrollDirection !== this._verticalScrollDirection || horizontalScrollDirection !== this._horizontalScrollDirection || scrollNode !== this._scrollNode)) {
      this._verticalScrollDirection = verticalScrollDirection;
      this._horizontalScrollDirection = horizontalScrollDirection;
      this._scrollNode = scrollNode;
      if ((verticalScrollDirection || horizontalScrollDirection) && scrollNode) {
        this._ngZone.runOutsideAngular(this._startScrollInterval);
      } else {
        this._stopScrolling();
      }
    }
  }
  /** Stops any currently-running auto-scroll sequences. */
  _stopScrolling() {
    this._stopScrollTimers.next();
  }
  /** Starts the dragging sequence within the list. */
  _draggingStarted() {
    const styles = coerceElement(this.element).style;
    this.beforeStarted.next();
    this._isDragging = true;
    this._initialScrollSnap = styles.msScrollSnapType || styles.scrollSnapType || "";
    styles.scrollSnapType = styles.msScrollSnapType = "none";
    this._sortStrategy.start(this._draggables);
    this._cacheParentPositions();
    this._viewportScrollSubscription.unsubscribe();
    this._listenToScrollEvents();
  }
  /** Caches the positions of the configured scrollable parents. */
  _cacheParentPositions() {
    const element = coerceElement(this.element);
    this._parentPositions.cache(this._scrollableElements);
    this._domRect = this._parentPositions.positions.get(element).clientRect;
  }
  /** Resets the container to its initial state. */
  _reset() {
    this._isDragging = false;
    const styles = coerceElement(this.element).style;
    styles.scrollSnapType = styles.msScrollSnapType = this._initialScrollSnap;
    this._siblings.forEach((sibling) => sibling._stopReceiving(this));
    this._sortStrategy.reset();
    this._stopScrolling();
    this._viewportScrollSubscription.unsubscribe();
    this._parentPositions.clear();
  }
  /**
   * Checks whether the user's pointer is positioned over the container.
   * @param x Pointer position along the X axis.
   * @param y Pointer position along the Y axis.
   */
  _isOverContainer(x, y) {
    return this._domRect != null && isInsideClientRect(this._domRect, x, y);
  }
  /**
   * Figures out whether an item should be moved into a sibling
   * drop container, based on its current position.
   * @param item Drag item that is being moved.
   * @param x Position of the item along the X axis.
   * @param y Position of the item along the Y axis.
   */
  _getSiblingContainerFromPosition(item, x, y) {
    return this._siblings.find((sibling) => sibling._canReceive(item, x, y));
  }
  /**
   * Checks whether the drop list can receive the passed-in item.
   * @param item Item that is being dragged into the list.
   * @param x Position of the item along the X axis.
   * @param y Position of the item along the Y axis.
   */
  _canReceive(item, x, y) {
    if (!this._domRect || !isInsideClientRect(this._domRect, x, y) || !this.enterPredicate(item, this)) {
      return false;
    }
    const elementFromPoint = this._getShadowRoot().elementFromPoint(x, y);
    if (!elementFromPoint) {
      return false;
    }
    const nativeElement = coerceElement(this.element);
    return elementFromPoint === nativeElement || nativeElement.contains(elementFromPoint);
  }
  /**
   * Called by one of the connected drop lists when a dragging sequence has started.
   * @param sibling Sibling in which dragging has started.
   */
  _startReceiving(sibling, items) {
    const activeSiblings = this._activeSiblings;
    if (!activeSiblings.has(sibling) && items.every((item) => {
      return this.enterPredicate(item, this) || this._draggables.indexOf(item) > -1;
    })) {
      activeSiblings.add(sibling);
      this._cacheParentPositions();
      this._listenToScrollEvents();
      this.receivingStarted.next({
        initiator: sibling,
        receiver: this,
        items
      });
    }
  }
  /**
   * Called by a connected drop list when dragging has stopped.
   * @param sibling Sibling whose dragging has stopped.
   */
  _stopReceiving(sibling) {
    this._activeSiblings.delete(sibling);
    this._viewportScrollSubscription.unsubscribe();
    this.receivingStopped.next({
      initiator: sibling,
      receiver: this
    });
  }
  /**
   * Starts listening to scroll events on the viewport.
   * Used for updating the internal state of the list.
   */
  _listenToScrollEvents() {
    this._viewportScrollSubscription = this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe((event) => {
      if (this.isDragging()) {
        const scrollDifference = this._parentPositions.handleScroll(event);
        if (scrollDifference) {
          this._sortStrategy.updateOnScroll(scrollDifference.top, scrollDifference.left);
        }
      } else if (this.isReceiving()) {
        this._cacheParentPositions();
      }
    });
  }
  /**
   * Lazily resolves and returns the shadow root of the element. We do this in a function, rather
   * than saving it in property directly on init, because we want to resolve it as late as possible
   * in order to ensure that the element has been moved into the shadow DOM. Doing it inside the
   * constructor might be too early if the element is inside of something like `ngFor` or `ngIf`.
   */
  _getShadowRoot() {
    if (!this._cachedShadowRoot) {
      const shadowRoot = _getShadowRoot(coerceElement(this.element));
      this._cachedShadowRoot = shadowRoot || this._document;
    }
    return this._cachedShadowRoot;
  }
  /** Notifies any siblings that may potentially receive the item. */
  _notifyReceivingSiblings() {
    const draggedItems = this._sortStrategy.getActiveItemsSnapshot().filter((item) => item.isDragging());
    this._siblings.forEach((sibling) => sibling._startReceiving(this, draggedItems));
  }
};
function getVerticalScrollDirection(clientRect, pointerY) {
  const {
    top,
    bottom,
    height
  } = clientRect;
  const yThreshold = height * SCROLL_PROXIMITY_THRESHOLD;
  if (pointerY >= top - yThreshold && pointerY <= top + yThreshold) {
    return AutoScrollVerticalDirection.UP;
  } else if (pointerY >= bottom - yThreshold && pointerY <= bottom + yThreshold) {
    return AutoScrollVerticalDirection.DOWN;
  }
  return AutoScrollVerticalDirection.NONE;
}
function getHorizontalScrollDirection(clientRect, pointerX) {
  const {
    left,
    right,
    width
  } = clientRect;
  const xThreshold = width * SCROLL_PROXIMITY_THRESHOLD;
  if (pointerX >= left - xThreshold && pointerX <= left + xThreshold) {
    return AutoScrollHorizontalDirection.LEFT;
  } else if (pointerX >= right - xThreshold && pointerX <= right + xThreshold) {
    return AutoScrollHorizontalDirection.RIGHT;
  }
  return AutoScrollHorizontalDirection.NONE;
}
function getElementScrollDirections(element, clientRect, direction, pointerX, pointerY) {
  const computedVertical = getVerticalScrollDirection(clientRect, pointerY);
  const computedHorizontal = getHorizontalScrollDirection(clientRect, pointerX);
  let verticalScrollDirection = AutoScrollVerticalDirection.NONE;
  let horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
  if (computedVertical) {
    const scrollTop = element.scrollTop;
    if (computedVertical === AutoScrollVerticalDirection.UP) {
      if (scrollTop > 0) {
        verticalScrollDirection = AutoScrollVerticalDirection.UP;
      }
    } else if (element.scrollHeight - scrollTop > element.clientHeight) {
      verticalScrollDirection = AutoScrollVerticalDirection.DOWN;
    }
  }
  if (computedHorizontal) {
    const scrollLeft = element.scrollLeft;
    if (direction === "rtl") {
      if (computedHorizontal === AutoScrollHorizontalDirection.RIGHT) {
        if (scrollLeft < 0) {
          horizontalScrollDirection = AutoScrollHorizontalDirection.RIGHT;
        }
      } else if (element.scrollWidth + scrollLeft > element.clientWidth) {
        horizontalScrollDirection = AutoScrollHorizontalDirection.LEFT;
      }
    } else {
      if (computedHorizontal === AutoScrollHorizontalDirection.LEFT) {
        if (scrollLeft > 0) {
          horizontalScrollDirection = AutoScrollHorizontalDirection.LEFT;
        }
      } else if (element.scrollWidth - scrollLeft > element.clientWidth) {
        horizontalScrollDirection = AutoScrollHorizontalDirection.RIGHT;
      }
    }
  }
  return [verticalScrollDirection, horizontalScrollDirection];
}
var activeCapturingEventOptions = normalizePassiveListenerOptions({
  passive: false,
  capture: true
});
var _DragDropRegistry = class _DragDropRegistry {
  constructor(_ngZone, _document) {
    this._ngZone = _ngZone;
    this._dropInstances = /* @__PURE__ */ new Set();
    this._dragInstances = /* @__PURE__ */ new Set();
    this._activeDragInstances = [];
    this._globalListeners = /* @__PURE__ */ new Map();
    this._draggingPredicate = (item) => item.isDragging();
    this.pointerMove = new Subject();
    this.pointerUp = new Subject();
    this.scroll = new Subject();
    this._preventDefaultWhileDragging = (event) => {
      if (this._activeDragInstances.length > 0) {
        event.preventDefault();
      }
    };
    this._persistentTouchmoveListener = (event) => {
      if (this._activeDragInstances.length > 0) {
        if (this._activeDragInstances.some(this._draggingPredicate)) {
          event.preventDefault();
        }
        this.pointerMove.next(event);
      }
    };
    this._document = _document;
  }
  /** Adds a drop container to the registry. */
  registerDropContainer(drop) {
    if (!this._dropInstances.has(drop)) {
      this._dropInstances.add(drop);
    }
  }
  /** Adds a drag item instance to the registry. */
  registerDragItem(drag) {
    this._dragInstances.add(drag);
    if (this._dragInstances.size === 1) {
      this._ngZone.runOutsideAngular(() => {
        this._document.addEventListener("touchmove", this._persistentTouchmoveListener, activeCapturingEventOptions);
      });
    }
  }
  /** Removes a drop container from the registry. */
  removeDropContainer(drop) {
    this._dropInstances.delete(drop);
  }
  /** Removes a drag item instance from the registry. */
  removeDragItem(drag) {
    this._dragInstances.delete(drag);
    this.stopDragging(drag);
    if (this._dragInstances.size === 0) {
      this._document.removeEventListener("touchmove", this._persistentTouchmoveListener, activeCapturingEventOptions);
    }
  }
  /**
   * Starts the dragging sequence for a drag instance.
   * @param drag Drag instance which is being dragged.
   * @param event Event that initiated the dragging.
   */
  startDragging(drag, event) {
    if (this._activeDragInstances.indexOf(drag) > -1) {
      return;
    }
    this._activeDragInstances.push(drag);
    if (this._activeDragInstances.length === 1) {
      const isTouchEvent2 = event.type.startsWith("touch");
      this._globalListeners.set(isTouchEvent2 ? "touchend" : "mouseup", {
        handler: (e) => this.pointerUp.next(e),
        options: true
      }).set("scroll", {
        handler: (e) => this.scroll.next(e),
        // Use capturing so that we pick up scroll changes in any scrollable nodes that aren't
        // the document. See https://github.com/angular/components/issues/17144.
        options: true
      }).set("selectstart", {
        handler: this._preventDefaultWhileDragging,
        options: activeCapturingEventOptions
      });
      if (!isTouchEvent2) {
        this._globalListeners.set("mousemove", {
          handler: (e) => this.pointerMove.next(e),
          options: activeCapturingEventOptions
        });
      }
      this._ngZone.runOutsideAngular(() => {
        this._globalListeners.forEach((config, name) => {
          this._document.addEventListener(name, config.handler, config.options);
        });
      });
    }
  }
  /** Stops dragging a drag item instance. */
  stopDragging(drag) {
    const index = this._activeDragInstances.indexOf(drag);
    if (index > -1) {
      this._activeDragInstances.splice(index, 1);
      if (this._activeDragInstances.length === 0) {
        this._clearGlobalListeners();
      }
    }
  }
  /** Gets whether a drag item instance is currently being dragged. */
  isDragging(drag) {
    return this._activeDragInstances.indexOf(drag) > -1;
  }
  /**
   * Gets a stream that will emit when any element on the page is scrolled while an item is being
   * dragged.
   * @param shadowRoot Optional shadow root that the current dragging sequence started from.
   *   Top-level listeners won't pick up events coming from the shadow DOM so this parameter can
   *   be used to include an additional top-level listener at the shadow root level.
   */
  scrolled(shadowRoot) {
    const streams = [this.scroll];
    if (shadowRoot && shadowRoot !== this._document) {
      streams.push(new Observable((observer) => {
        return this._ngZone.runOutsideAngular(() => {
          const eventOptions = true;
          const callback = (event) => {
            if (this._activeDragInstances.length) {
              observer.next(event);
            }
          };
          shadowRoot.addEventListener("scroll", callback, eventOptions);
          return () => {
            shadowRoot.removeEventListener("scroll", callback, eventOptions);
          };
        });
      }));
    }
    return merge(...streams);
  }
  ngOnDestroy() {
    this._dragInstances.forEach((instance) => this.removeDragItem(instance));
    this._dropInstances.forEach((instance) => this.removeDropContainer(instance));
    this._clearGlobalListeners();
    this.pointerMove.complete();
    this.pointerUp.complete();
  }
  /** Clears out the global event listeners from the `document`. */
  _clearGlobalListeners() {
    this._globalListeners.forEach((config, name) => {
      this._document.removeEventListener(name, config.handler, config.options);
    });
    this._globalListeners.clear();
  }
};
_DragDropRegistry.ɵfac = function DragDropRegistry_Factory(t) {
  return new (t || _DragDropRegistry)(ɵɵinject(NgZone), ɵɵinject(DOCUMENT));
};
_DragDropRegistry.ɵprov = ɵɵdefineInjectable({
  token: _DragDropRegistry,
  factory: _DragDropRegistry.ɵfac,
  providedIn: "root"
});
var DragDropRegistry = _DragDropRegistry;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDropRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var DEFAULT_CONFIG = {
  dragStartThreshold: 5,
  pointerDirectionChangeThreshold: 5
};
var _DragDrop = class _DragDrop {
  constructor(_document, _ngZone, _viewportRuler, _dragDropRegistry) {
    this._document = _document;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._dragDropRegistry = _dragDropRegistry;
  }
  /**
   * Turns an element into a draggable item.
   * @param element Element to which to attach the dragging functionality.
   * @param config Object used to configure the dragging behavior.
   */
  createDrag(element, config = DEFAULT_CONFIG) {
    return new DragRef(element, config, this._document, this._ngZone, this._viewportRuler, this._dragDropRegistry);
  }
  /**
   * Turns an element into a drop list.
   * @param element Element to which to attach the drop list functionality.
   */
  createDropList(element) {
    return new DropListRef(element, this._dragDropRegistry, this._document, this._ngZone, this._viewportRuler);
  }
};
_DragDrop.ɵfac = function DragDrop_Factory(t) {
  return new (t || _DragDrop)(ɵɵinject(DOCUMENT), ɵɵinject(NgZone), ɵɵinject(ViewportRuler), ɵɵinject(DragDropRegistry));
};
_DragDrop.ɵprov = ɵɵdefineInjectable({
  token: _DragDrop,
  factory: _DragDrop.ɵfac,
  providedIn: "root"
});
var DragDrop = _DragDrop;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDrop, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: NgZone
  }, {
    type: ViewportRuler
  }, {
    type: DragDropRegistry
  }], null);
})();
var CDK_DRAG_PARENT = new InjectionToken("CDK_DRAG_PARENT");
function assertElementNode(node, name) {
  if (node.nodeType !== 1) {
    throw Error(`${name} must be attached to an element node. Currently attached to "${node.nodeName}".`);
  }
}
var CDK_DRAG_HANDLE = new InjectionToken("CdkDragHandle");
var _CdkDragHandle = class _CdkDragHandle {
  /** Whether starting to drag through this handle is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._stateChanges.next(this);
  }
  constructor(element, _parentDrag) {
    this.element = element;
    this._parentDrag = _parentDrag;
    this._stateChanges = new Subject();
    this._disabled = false;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      assertElementNode(element.nativeElement, "cdkDragHandle");
    }
    _parentDrag?._addHandle(this);
  }
  ngOnDestroy() {
    this._parentDrag?._removeHandle(this);
    this._stateChanges.complete();
  }
};
_CdkDragHandle.ɵfac = function CdkDragHandle_Factory(t) {
  return new (t || _CdkDragHandle)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(CDK_DRAG_PARENT, 12));
};
_CdkDragHandle.ɵdir = ɵɵdefineDirective({
  type: _CdkDragHandle,
  selectors: [["", "cdkDragHandle", ""]],
  hostAttrs: [1, "cdk-drag-handle"],
  inputs: {
    disabled: [InputFlags.HasDecoratorInputTransform, "cdkDragHandleDisabled", "disabled", booleanAttribute]
  },
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: CDK_DRAG_HANDLE,
    useExisting: _CdkDragHandle
  }]), ɵɵInputTransformsFeature]
});
var CdkDragHandle = _CdkDragHandle;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragHandle, [{
    type: Directive,
    args: [{
      selector: "[cdkDragHandle]",
      standalone: true,
      host: {
        "class": "cdk-drag-handle"
      },
      providers: [{
        provide: CDK_DRAG_HANDLE,
        useExisting: CdkDragHandle
      }]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [CDK_DRAG_PARENT]
    }, {
      type: Optional
    }, {
      type: SkipSelf
    }]
  }], {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDragHandleDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var CDK_DRAG_CONFIG = new InjectionToken("CDK_DRAG_CONFIG");
var DRAG_HOST_CLASS = "cdk-drag";
var CDK_DROP_LIST = new InjectionToken("CdkDropList");
var _CdkDrag = class _CdkDrag {
  /** Whether starting to drag this element is disabled. */
  get disabled() {
    return this._disabled || this.dropContainer && this.dropContainer.disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._dragRef.disabled = this._disabled;
  }
  constructor(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, _selfHandle, _parentDrag) {
    this.element = element;
    this.dropContainer = dropContainer;
    this._ngZone = _ngZone;
    this._viewContainerRef = _viewContainerRef;
    this._dir = _dir;
    this._changeDetectorRef = _changeDetectorRef;
    this._selfHandle = _selfHandle;
    this._parentDrag = _parentDrag;
    this._destroyed = new Subject();
    this._handles = new BehaviorSubject([]);
    this.started = new EventEmitter();
    this.released = new EventEmitter();
    this.ended = new EventEmitter();
    this.entered = new EventEmitter();
    this.exited = new EventEmitter();
    this.dropped = new EventEmitter();
    this.moved = new Observable((observer) => {
      const subscription = this._dragRef.moved.pipe(map((movedEvent) => ({
        source: this,
        pointerPosition: movedEvent.pointerPosition,
        event: movedEvent.event,
        delta: movedEvent.delta,
        distance: movedEvent.distance
      }))).subscribe(observer);
      return () => {
        subscription.unsubscribe();
      };
    });
    this._dragRef = dragDrop.createDrag(element, {
      dragStartThreshold: config && config.dragStartThreshold != null ? config.dragStartThreshold : 5,
      pointerDirectionChangeThreshold: config && config.pointerDirectionChangeThreshold != null ? config.pointerDirectionChangeThreshold : 5,
      zIndex: config?.zIndex
    });
    this._dragRef.data = this;
    _CdkDrag._dragInstances.push(this);
    if (config) {
      this._assignDefaults(config);
    }
    if (dropContainer) {
      this._dragRef._withDropContainer(dropContainer._dropListRef);
      dropContainer.addItem(this);
    }
    this._syncInputs(this._dragRef);
    this._handleEvents(this._dragRef);
  }
  /**
   * Returns the element that is being used as a placeholder
   * while the current element is being dragged.
   */
  getPlaceholderElement() {
    return this._dragRef.getPlaceholderElement();
  }
  /** Returns the root draggable element. */
  getRootElement() {
    return this._dragRef.getRootElement();
  }
  /** Resets a standalone drag item to its initial position. */
  reset() {
    this._dragRef.reset();
  }
  /**
   * Gets the pixel coordinates of the draggable outside of a drop container.
   */
  getFreeDragPosition() {
    return this._dragRef.getFreeDragPosition();
  }
  /**
   * Sets the current position in pixels the draggable outside of a drop container.
   * @param value New position to be set.
   */
  setFreeDragPosition(value) {
    this._dragRef.setFreeDragPosition(value);
  }
  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.pipe(take(1), takeUntil(this._destroyed)).subscribe(() => {
        this._updateRootElement();
        this._setupHandlesListener();
        if (this.freeDragPosition) {
          this._dragRef.setFreeDragPosition(this.freeDragPosition);
        }
      });
    });
  }
  ngOnChanges(changes) {
    const rootSelectorChange = changes["rootElementSelector"];
    const positionChange = changes["freeDragPosition"];
    if (rootSelectorChange && !rootSelectorChange.firstChange) {
      this._updateRootElement();
    }
    if (positionChange && !positionChange.firstChange && this.freeDragPosition) {
      this._dragRef.setFreeDragPosition(this.freeDragPosition);
    }
  }
  ngOnDestroy() {
    if (this.dropContainer) {
      this.dropContainer.removeItem(this);
    }
    const index = _CdkDrag._dragInstances.indexOf(this);
    if (index > -1) {
      _CdkDrag._dragInstances.splice(index, 1);
    }
    this._ngZone.runOutsideAngular(() => {
      this._handles.complete();
      this._destroyed.next();
      this._destroyed.complete();
      this._dragRef.dispose();
    });
  }
  _addHandle(handle) {
    const handles = this._handles.getValue();
    handles.push(handle);
    this._handles.next(handles);
  }
  _removeHandle(handle) {
    const handles = this._handles.getValue();
    const index = handles.indexOf(handle);
    if (index > -1) {
      handles.splice(index, 1);
      this._handles.next(handles);
    }
  }
  _setPreviewTemplate(preview) {
    this._previewTemplate = preview;
  }
  _resetPreviewTemplate(preview) {
    if (preview === this._previewTemplate) {
      this._previewTemplate = null;
    }
  }
  _setPlaceholderTemplate(placeholder) {
    this._placeholderTemplate = placeholder;
  }
  _resetPlaceholderTemplate(placeholder) {
    if (placeholder === this._placeholderTemplate) {
      this._placeholderTemplate = null;
    }
  }
  /** Syncs the root element with the `DragRef`. */
  _updateRootElement() {
    const element = this.element.nativeElement;
    let rootElement = element;
    if (this.rootElementSelector) {
      rootElement = element.closest !== void 0 ? element.closest(this.rootElementSelector) : (
        // Comment tag doesn't have closest method, so use parent's one.
        element.parentElement?.closest(this.rootElementSelector)
      );
    }
    if (rootElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
      assertElementNode(rootElement, "cdkDrag");
    }
    this._dragRef.withRootElement(rootElement || element);
  }
  /** Gets the boundary element, based on the `boundaryElement` value. */
  _getBoundaryElement() {
    const boundary = this.boundaryElement;
    if (!boundary) {
      return null;
    }
    if (typeof boundary === "string") {
      return this.element.nativeElement.closest(boundary);
    }
    return coerceElement(boundary);
  }
  /** Syncs the inputs of the CdkDrag with the options of the underlying DragRef. */
  _syncInputs(ref) {
    ref.beforeStarted.subscribe(() => {
      if (!ref.isDragging()) {
        const dir = this._dir;
        const dragStartDelay = this.dragStartDelay;
        const placeholder = this._placeholderTemplate ? {
          template: this._placeholderTemplate.templateRef,
          context: this._placeholderTemplate.data,
          viewContainer: this._viewContainerRef
        } : null;
        const preview = this._previewTemplate ? {
          template: this._previewTemplate.templateRef,
          context: this._previewTemplate.data,
          matchSize: this._previewTemplate.matchSize,
          viewContainer: this._viewContainerRef
        } : null;
        ref.disabled = this.disabled;
        ref.lockAxis = this.lockAxis;
        ref.dragStartDelay = typeof dragStartDelay === "object" && dragStartDelay ? dragStartDelay : coerceNumberProperty(dragStartDelay);
        ref.constrainPosition = this.constrainPosition;
        ref.previewClass = this.previewClass;
        ref.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(placeholder).withPreviewTemplate(preview).withPreviewContainer(this.previewContainer || "global");
        if (dir) {
          ref.withDirection(dir.value);
        }
      }
    });
    ref.beforeStarted.pipe(take(1)).subscribe(() => {
      if (this._parentDrag) {
        ref.withParent(this._parentDrag._dragRef);
        return;
      }
      let parent = this.element.nativeElement.parentElement;
      while (parent) {
        if (parent.classList.contains(DRAG_HOST_CLASS)) {
          ref.withParent(_CdkDrag._dragInstances.find((drag) => {
            return drag.element.nativeElement === parent;
          })?._dragRef || null);
          break;
        }
        parent = parent.parentElement;
      }
    });
  }
  /** Handles the events from the underlying `DragRef`. */
  _handleEvents(ref) {
    ref.started.subscribe((startEvent) => {
      this.started.emit({
        source: this,
        event: startEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.released.subscribe((releaseEvent) => {
      this.released.emit({
        source: this,
        event: releaseEvent.event
      });
    });
    ref.ended.subscribe((endEvent) => {
      this.ended.emit({
        source: this,
        distance: endEvent.distance,
        dropPoint: endEvent.dropPoint,
        event: endEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.entered.subscribe((enterEvent) => {
      this.entered.emit({
        container: enterEvent.container.data,
        item: this,
        currentIndex: enterEvent.currentIndex
      });
    });
    ref.exited.subscribe((exitEvent) => {
      this.exited.emit({
        container: exitEvent.container.data,
        item: this
      });
    });
    ref.dropped.subscribe((dropEvent) => {
      this.dropped.emit({
        previousIndex: dropEvent.previousIndex,
        currentIndex: dropEvent.currentIndex,
        previousContainer: dropEvent.previousContainer.data,
        container: dropEvent.container.data,
        isPointerOverContainer: dropEvent.isPointerOverContainer,
        item: this,
        distance: dropEvent.distance,
        dropPoint: dropEvent.dropPoint,
        event: dropEvent.event
      });
    });
  }
  /** Assigns the default input values based on a provided config object. */
  _assignDefaults(config) {
    const {
      lockAxis,
      dragStartDelay,
      constrainPosition,
      previewClass,
      boundaryElement,
      draggingDisabled,
      rootElementSelector,
      previewContainer
    } = config;
    this.disabled = draggingDisabled == null ? false : draggingDisabled;
    this.dragStartDelay = dragStartDelay || 0;
    if (lockAxis) {
      this.lockAxis = lockAxis;
    }
    if (constrainPosition) {
      this.constrainPosition = constrainPosition;
    }
    if (previewClass) {
      this.previewClass = previewClass;
    }
    if (boundaryElement) {
      this.boundaryElement = boundaryElement;
    }
    if (rootElementSelector) {
      this.rootElementSelector = rootElementSelector;
    }
    if (previewContainer) {
      this.previewContainer = previewContainer;
    }
  }
  /** Sets up the listener that syncs the handles with the drag ref. */
  _setupHandlesListener() {
    this._handles.pipe(
      // Sync the new handles with the DragRef.
      tap((handles) => {
        const handleElements = handles.map((handle) => handle.element);
        if (this._selfHandle && this.rootElementSelector) {
          handleElements.push(this.element);
        }
        this._dragRef.withHandles(handleElements);
      }),
      // Listen if the state of any of the handles changes.
      switchMap((handles) => {
        return merge(...handles.map((item) => item._stateChanges.pipe(startWith(item))));
      }),
      takeUntil(this._destroyed)
    ).subscribe((handleInstance) => {
      const dragRef = this._dragRef;
      const handle = handleInstance.element.nativeElement;
      handleInstance.disabled ? dragRef.disableHandle(handle) : dragRef.enableHandle(handle);
    });
  }
};
_CdkDrag._dragInstances = [];
_CdkDrag.ɵfac = function CdkDrag_Factory(t) {
  return new (t || _CdkDrag)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(CDK_DROP_LIST, 12), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(CDK_DRAG_CONFIG, 8), ɵɵdirectiveInject(Directionality, 8), ɵɵdirectiveInject(DragDrop), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(CDK_DRAG_HANDLE, 10), ɵɵdirectiveInject(CDK_DRAG_PARENT, 12));
};
_CdkDrag.ɵdir = ɵɵdefineDirective({
  type: _CdkDrag,
  selectors: [["", "cdkDrag", ""]],
  hostAttrs: [1, "cdk-drag"],
  hostVars: 4,
  hostBindings: function CdkDrag_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("cdk-drag-disabled", ctx.disabled)("cdk-drag-dragging", ctx._dragRef.isDragging());
    }
  },
  inputs: {
    data: [InputFlags.None, "cdkDragData", "data"],
    lockAxis: [InputFlags.None, "cdkDragLockAxis", "lockAxis"],
    rootElementSelector: [InputFlags.None, "cdkDragRootElement", "rootElementSelector"],
    boundaryElement: [InputFlags.None, "cdkDragBoundary", "boundaryElement"],
    dragStartDelay: [InputFlags.None, "cdkDragStartDelay", "dragStartDelay"],
    freeDragPosition: [InputFlags.None, "cdkDragFreeDragPosition", "freeDragPosition"],
    disabled: [InputFlags.HasDecoratorInputTransform, "cdkDragDisabled", "disabled", booleanAttribute],
    constrainPosition: [InputFlags.None, "cdkDragConstrainPosition", "constrainPosition"],
    previewClass: [InputFlags.None, "cdkDragPreviewClass", "previewClass"],
    previewContainer: [InputFlags.None, "cdkDragPreviewContainer", "previewContainer"]
  },
  outputs: {
    started: "cdkDragStarted",
    released: "cdkDragReleased",
    ended: "cdkDragEnded",
    entered: "cdkDragEntered",
    exited: "cdkDragExited",
    dropped: "cdkDragDropped",
    moved: "cdkDragMoved"
  },
  exportAs: ["cdkDrag"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: CDK_DRAG_PARENT,
    useExisting: _CdkDrag
  }]), ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature]
});
var CdkDrag = _CdkDrag;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDrag, [{
    type: Directive,
    args: [{
      selector: "[cdkDrag]",
      exportAs: "cdkDrag",
      standalone: true,
      host: {
        "class": DRAG_HOST_CLASS,
        "[class.cdk-drag-disabled]": "disabled",
        "[class.cdk-drag-dragging]": "_dragRef.isDragging()"
      },
      providers: [{
        provide: CDK_DRAG_PARENT,
        useExisting: CdkDrag
      }]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [CDK_DROP_LIST]
    }, {
      type: Optional
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: NgZone
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CDK_DRAG_CONFIG]
    }]
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: DragDrop
  }, {
    type: ChangeDetectorRef
  }, {
    type: CdkDragHandle,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [CDK_DRAG_HANDLE]
    }]
  }, {
    type: CdkDrag,
    decorators: [{
      type: Optional
    }, {
      type: SkipSelf
    }, {
      type: Inject,
      args: [CDK_DRAG_PARENT]
    }]
  }], {
    data: [{
      type: Input,
      args: ["cdkDragData"]
    }],
    lockAxis: [{
      type: Input,
      args: ["cdkDragLockAxis"]
    }],
    rootElementSelector: [{
      type: Input,
      args: ["cdkDragRootElement"]
    }],
    boundaryElement: [{
      type: Input,
      args: ["cdkDragBoundary"]
    }],
    dragStartDelay: [{
      type: Input,
      args: ["cdkDragStartDelay"]
    }],
    freeDragPosition: [{
      type: Input,
      args: ["cdkDragFreeDragPosition"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDragDisabled",
        transform: booleanAttribute
      }]
    }],
    constrainPosition: [{
      type: Input,
      args: ["cdkDragConstrainPosition"]
    }],
    previewClass: [{
      type: Input,
      args: ["cdkDragPreviewClass"]
    }],
    previewContainer: [{
      type: Input,
      args: ["cdkDragPreviewContainer"]
    }],
    started: [{
      type: Output,
      args: ["cdkDragStarted"]
    }],
    released: [{
      type: Output,
      args: ["cdkDragReleased"]
    }],
    ended: [{
      type: Output,
      args: ["cdkDragEnded"]
    }],
    entered: [{
      type: Output,
      args: ["cdkDragEntered"]
    }],
    exited: [{
      type: Output,
      args: ["cdkDragExited"]
    }],
    dropped: [{
      type: Output,
      args: ["cdkDragDropped"]
    }],
    moved: [{
      type: Output,
      args: ["cdkDragMoved"]
    }]
  });
})();
var CDK_DROP_LIST_GROUP = new InjectionToken("CdkDropListGroup");
var _CdkDropListGroup = class _CdkDropListGroup {
  constructor() {
    this._items = /* @__PURE__ */ new Set();
    this.disabled = false;
  }
  ngOnDestroy() {
    this._items.clear();
  }
};
_CdkDropListGroup.ɵfac = function CdkDropListGroup_Factory(t) {
  return new (t || _CdkDropListGroup)();
};
_CdkDropListGroup.ɵdir = ɵɵdefineDirective({
  type: _CdkDropListGroup,
  selectors: [["", "cdkDropListGroup", ""]],
  inputs: {
    disabled: [InputFlags.HasDecoratorInputTransform, "cdkDropListGroupDisabled", "disabled", booleanAttribute]
  },
  exportAs: ["cdkDropListGroup"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: CDK_DROP_LIST_GROUP,
    useExisting: _CdkDropListGroup
  }]), ɵɵInputTransformsFeature]
});
var CdkDropListGroup = _CdkDropListGroup;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDropListGroup, [{
    type: Directive,
    args: [{
      selector: "[cdkDropListGroup]",
      exportAs: "cdkDropListGroup",
      standalone: true,
      providers: [{
        provide: CDK_DROP_LIST_GROUP,
        useExisting: CdkDropListGroup
      }]
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListGroupDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var _uniqueIdCounter = 0;
var _CdkDropList = class _CdkDropList {
  /** Whether starting a dragging sequence from this container is disabled. */
  get disabled() {
    return this._disabled || !!this._group && this._group.disabled;
  }
  set disabled(value) {
    this._dropListRef.disabled = this._disabled = value;
  }
  constructor(element, dragDrop, _changeDetectorRef, _scrollDispatcher, _dir, _group, config) {
    this.element = element;
    this._changeDetectorRef = _changeDetectorRef;
    this._scrollDispatcher = _scrollDispatcher;
    this._dir = _dir;
    this._group = _group;
    this._destroyed = new Subject();
    this.connectedTo = [];
    this.id = `cdk-drop-list-${_uniqueIdCounter++}`;
    this.enterPredicate = () => true;
    this.sortPredicate = () => true;
    this.dropped = new EventEmitter();
    this.entered = new EventEmitter();
    this.exited = new EventEmitter();
    this.sorted = new EventEmitter();
    this._unsortedItems = /* @__PURE__ */ new Set();
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      assertElementNode(element.nativeElement, "cdkDropList");
    }
    this._dropListRef = dragDrop.createDropList(element);
    this._dropListRef.data = this;
    if (config) {
      this._assignDefaults(config);
    }
    this._dropListRef.enterPredicate = (drag, drop) => {
      return this.enterPredicate(drag.data, drop.data);
    };
    this._dropListRef.sortPredicate = (index, drag, drop) => {
      return this.sortPredicate(index, drag.data, drop.data);
    };
    this._setupInputSyncSubscription(this._dropListRef);
    this._handleEvents(this._dropListRef);
    _CdkDropList._dropLists.push(this);
    if (_group) {
      _group._items.add(this);
    }
  }
  /** Registers an items with the drop list. */
  addItem(item) {
    this._unsortedItems.add(item);
    if (this._dropListRef.isDragging()) {
      this._syncItemsWithRef();
    }
  }
  /** Removes an item from the drop list. */
  removeItem(item) {
    this._unsortedItems.delete(item);
    if (this._dropListRef.isDragging()) {
      this._syncItemsWithRef();
    }
  }
  /** Gets the registered items in the list, sorted by their position in the DOM. */
  getSortedItems() {
    return Array.from(this._unsortedItems).sort((a, b) => {
      const documentPosition = a._dragRef.getVisibleElement().compareDocumentPosition(b._dragRef.getVisibleElement());
      return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }
  ngOnDestroy() {
    const index = _CdkDropList._dropLists.indexOf(this);
    if (index > -1) {
      _CdkDropList._dropLists.splice(index, 1);
    }
    if (this._group) {
      this._group._items.delete(this);
    }
    this._unsortedItems.clear();
    this._dropListRef.dispose();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Syncs the inputs of the CdkDropList with the options of the underlying DropListRef. */
  _setupInputSyncSubscription(ref) {
    if (this._dir) {
      this._dir.change.pipe(startWith(this._dir.value), takeUntil(this._destroyed)).subscribe((value) => ref.withDirection(value));
    }
    ref.beforeStarted.subscribe(() => {
      const siblings = coerceArray(this.connectedTo).map((drop) => {
        if (typeof drop === "string") {
          const correspondingDropList = _CdkDropList._dropLists.find((list) => list.id === drop);
          if (!correspondingDropList && (typeof ngDevMode === "undefined" || ngDevMode)) {
            console.warn(`CdkDropList could not find connected drop list with id "${drop}"`);
          }
          return correspondingDropList;
        }
        return drop;
      });
      if (this._group) {
        this._group._items.forEach((drop) => {
          if (siblings.indexOf(drop) === -1) {
            siblings.push(drop);
          }
        });
      }
      if (!this._scrollableParentsResolved) {
        const scrollableParents = this._scrollDispatcher.getAncestorScrollContainers(this.element).map((scrollable) => scrollable.getElementRef().nativeElement);
        this._dropListRef.withScrollableParents(scrollableParents);
        this._scrollableParentsResolved = true;
      }
      ref.disabled = this.disabled;
      ref.lockAxis = this.lockAxis;
      ref.sortingDisabled = this.sortingDisabled;
      ref.autoScrollDisabled = this.autoScrollDisabled;
      ref.autoScrollStep = coerceNumberProperty(this.autoScrollStep, 2);
      ref.connectedTo(siblings.filter((drop) => drop && drop !== this).map((list) => list._dropListRef)).withOrientation(this.orientation);
    });
  }
  /** Handles events from the underlying DropListRef. */
  _handleEvents(ref) {
    ref.beforeStarted.subscribe(() => {
      this._syncItemsWithRef();
      this._changeDetectorRef.markForCheck();
    });
    ref.entered.subscribe((event) => {
      this.entered.emit({
        container: this,
        item: event.item.data,
        currentIndex: event.currentIndex
      });
    });
    ref.exited.subscribe((event) => {
      this.exited.emit({
        container: this,
        item: event.item.data
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.sorted.subscribe((event) => {
      this.sorted.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        container: this,
        item: event.item.data
      });
    });
    ref.dropped.subscribe((dropEvent) => {
      this.dropped.emit({
        previousIndex: dropEvent.previousIndex,
        currentIndex: dropEvent.currentIndex,
        previousContainer: dropEvent.previousContainer.data,
        container: dropEvent.container.data,
        item: dropEvent.item.data,
        isPointerOverContainer: dropEvent.isPointerOverContainer,
        distance: dropEvent.distance,
        dropPoint: dropEvent.dropPoint,
        event: dropEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    merge(ref.receivingStarted, ref.receivingStopped).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  /** Assigns the default input values based on a provided config object. */
  _assignDefaults(config) {
    const {
      lockAxis,
      draggingDisabled,
      sortingDisabled,
      listAutoScrollDisabled,
      listOrientation
    } = config;
    this.disabled = draggingDisabled == null ? false : draggingDisabled;
    this.sortingDisabled = sortingDisabled == null ? false : sortingDisabled;
    this.autoScrollDisabled = listAutoScrollDisabled == null ? false : listAutoScrollDisabled;
    this.orientation = listOrientation || "vertical";
    if (lockAxis) {
      this.lockAxis = lockAxis;
    }
  }
  /** Syncs up the registered drag items with underlying drop list ref. */
  _syncItemsWithRef() {
    this._dropListRef.withItems(this.getSortedItems().map((item) => item._dragRef));
  }
};
_CdkDropList._dropLists = [];
_CdkDropList.ɵfac = function CdkDropList_Factory(t) {
  return new (t || _CdkDropList)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DragDrop), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ScrollDispatcher), ɵɵdirectiveInject(Directionality, 8), ɵɵdirectiveInject(CDK_DROP_LIST_GROUP, 12), ɵɵdirectiveInject(CDK_DRAG_CONFIG, 8));
};
_CdkDropList.ɵdir = ɵɵdefineDirective({
  type: _CdkDropList,
  selectors: [["", "cdkDropList", ""], ["cdk-drop-list"]],
  hostAttrs: [1, "cdk-drop-list"],
  hostVars: 7,
  hostBindings: function CdkDropList_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("id", ctx.id);
      ɵɵclassProp("cdk-drop-list-disabled", ctx.disabled)("cdk-drop-list-dragging", ctx._dropListRef.isDragging())("cdk-drop-list-receiving", ctx._dropListRef.isReceiving());
    }
  },
  inputs: {
    connectedTo: [InputFlags.None, "cdkDropListConnectedTo", "connectedTo"],
    data: [InputFlags.None, "cdkDropListData", "data"],
    orientation: [InputFlags.None, "cdkDropListOrientation", "orientation"],
    id: "id",
    lockAxis: [InputFlags.None, "cdkDropListLockAxis", "lockAxis"],
    disabled: [InputFlags.HasDecoratorInputTransform, "cdkDropListDisabled", "disabled", booleanAttribute],
    sortingDisabled: [InputFlags.HasDecoratorInputTransform, "cdkDropListSortingDisabled", "sortingDisabled", booleanAttribute],
    enterPredicate: [InputFlags.None, "cdkDropListEnterPredicate", "enterPredicate"],
    sortPredicate: [InputFlags.None, "cdkDropListSortPredicate", "sortPredicate"],
    autoScrollDisabled: [InputFlags.HasDecoratorInputTransform, "cdkDropListAutoScrollDisabled", "autoScrollDisabled", booleanAttribute],
    autoScrollStep: [InputFlags.None, "cdkDropListAutoScrollStep", "autoScrollStep"]
  },
  outputs: {
    dropped: "cdkDropListDropped",
    entered: "cdkDropListEntered",
    exited: "cdkDropListExited",
    sorted: "cdkDropListSorted"
  },
  exportAs: ["cdkDropList"],
  standalone: true,
  features: [ɵɵProvidersFeature([
    // Prevent child drop lists from picking up the same group as their parent.
    {
      provide: CDK_DROP_LIST_GROUP,
      useValue: void 0
    },
    {
      provide: CDK_DROP_LIST,
      useExisting: _CdkDropList
    }
  ]), ɵɵInputTransformsFeature]
});
var CdkDropList = _CdkDropList;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDropList, [{
    type: Directive,
    args: [{
      selector: "[cdkDropList], cdk-drop-list",
      exportAs: "cdkDropList",
      standalone: true,
      providers: [
        // Prevent child drop lists from picking up the same group as their parent.
        {
          provide: CDK_DROP_LIST_GROUP,
          useValue: void 0
        },
        {
          provide: CDK_DROP_LIST,
          useExisting: CdkDropList
        }
      ],
      host: {
        "class": "cdk-drop-list",
        "[attr.id]": "id",
        "[class.cdk-drop-list-disabled]": "disabled",
        "[class.cdk-drop-list-dragging]": "_dropListRef.isDragging()",
        "[class.cdk-drop-list-receiving]": "_dropListRef.isReceiving()"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: DragDrop
  }, {
    type: ChangeDetectorRef
  }, {
    type: ScrollDispatcher
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: CdkDropListGroup,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CDK_DROP_LIST_GROUP]
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CDK_DRAG_CONFIG]
    }]
  }], {
    connectedTo: [{
      type: Input,
      args: ["cdkDropListConnectedTo"]
    }],
    data: [{
      type: Input,
      args: ["cdkDropListData"]
    }],
    orientation: [{
      type: Input,
      args: ["cdkDropListOrientation"]
    }],
    id: [{
      type: Input
    }],
    lockAxis: [{
      type: Input,
      args: ["cdkDropListLockAxis"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListDisabled",
        transform: booleanAttribute
      }]
    }],
    sortingDisabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListSortingDisabled",
        transform: booleanAttribute
      }]
    }],
    enterPredicate: [{
      type: Input,
      args: ["cdkDropListEnterPredicate"]
    }],
    sortPredicate: [{
      type: Input,
      args: ["cdkDropListSortPredicate"]
    }],
    autoScrollDisabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListAutoScrollDisabled",
        transform: booleanAttribute
      }]
    }],
    autoScrollStep: [{
      type: Input,
      args: ["cdkDropListAutoScrollStep"]
    }],
    dropped: [{
      type: Output,
      args: ["cdkDropListDropped"]
    }],
    entered: [{
      type: Output,
      args: ["cdkDropListEntered"]
    }],
    exited: [{
      type: Output,
      args: ["cdkDropListExited"]
    }],
    sorted: [{
      type: Output,
      args: ["cdkDropListSorted"]
    }]
  });
})();
var CDK_DRAG_PREVIEW = new InjectionToken("CdkDragPreview");
var _CdkDragPreview = class _CdkDragPreview {
  constructor(templateRef) {
    this.templateRef = templateRef;
    this._drag = inject(CDK_DRAG_PARENT, {
      optional: true
    });
    this.matchSize = false;
    this._drag?._setPreviewTemplate(this);
  }
  ngOnDestroy() {
    this._drag?._resetPreviewTemplate(this);
  }
};
_CdkDragPreview.ɵfac = function CdkDragPreview_Factory(t) {
  return new (t || _CdkDragPreview)(ɵɵdirectiveInject(TemplateRef));
};
_CdkDragPreview.ɵdir = ɵɵdefineDirective({
  type: _CdkDragPreview,
  selectors: [["ng-template", "cdkDragPreview", ""]],
  inputs: {
    data: "data",
    matchSize: [InputFlags.HasDecoratorInputTransform, "matchSize", "matchSize", booleanAttribute]
  },
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: CDK_DRAG_PREVIEW,
    useExisting: _CdkDragPreview
  }]), ɵɵInputTransformsFeature]
});
var CdkDragPreview = _CdkDragPreview;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragPreview, [{
    type: Directive,
    args: [{
      selector: "ng-template[cdkDragPreview]",
      standalone: true,
      providers: [{
        provide: CDK_DRAG_PREVIEW,
        useExisting: CdkDragPreview
      }]
    }]
  }], () => [{
    type: TemplateRef
  }], {
    data: [{
      type: Input
    }],
    matchSize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CDK_DRAG_PLACEHOLDER = new InjectionToken("CdkDragPlaceholder");
var _CdkDragPlaceholder = class _CdkDragPlaceholder {
  constructor(templateRef) {
    this.templateRef = templateRef;
    this._drag = inject(CDK_DRAG_PARENT, {
      optional: true
    });
    this._drag?._setPlaceholderTemplate(this);
  }
  ngOnDestroy() {
    this._drag?._resetPlaceholderTemplate(this);
  }
};
_CdkDragPlaceholder.ɵfac = function CdkDragPlaceholder_Factory(t) {
  return new (t || _CdkDragPlaceholder)(ɵɵdirectiveInject(TemplateRef));
};
_CdkDragPlaceholder.ɵdir = ɵɵdefineDirective({
  type: _CdkDragPlaceholder,
  selectors: [["ng-template", "cdkDragPlaceholder", ""]],
  inputs: {
    data: "data"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: CDK_DRAG_PLACEHOLDER,
    useExisting: _CdkDragPlaceholder
  }])]
});
var CdkDragPlaceholder = _CdkDragPlaceholder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragPlaceholder, [{
    type: Directive,
    args: [{
      selector: "ng-template[cdkDragPlaceholder]",
      standalone: true,
      providers: [{
        provide: CDK_DRAG_PLACEHOLDER,
        useExisting: CdkDragPlaceholder
      }]
    }]
  }], () => [{
    type: TemplateRef
  }], {
    data: [{
      type: Input
    }]
  });
})();
var DRAG_DROP_DIRECTIVES = [CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder];
var _DragDropModule = class _DragDropModule {
};
_DragDropModule.ɵfac = function DragDropModule_Factory(t) {
  return new (t || _DragDropModule)();
};
_DragDropModule.ɵmod = ɵɵdefineNgModule({
  type: _DragDropModule,
  imports: [CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder],
  exports: [CdkScrollableModule, CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder]
});
_DragDropModule.ɵinj = ɵɵdefineInjector({
  providers: [DragDrop],
  imports: [CdkScrollableModule]
});
var DragDropModule = _DragDropModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDropModule, [{
    type: NgModule,
    args: [{
      imports: DRAG_DROP_DIRECTIVES,
      exports: [CdkScrollableModule, ...DRAG_DROP_DIRECTIVES],
      providers: [DragDrop]
    }]
  }], null, null);
})();

// ../../node_modules/primeng/fesm2022/primeng-icons-angledoubledown.mjs
var AngleDoubleDownIcon = class _AngleDoubleDownIcon extends BaseIcon {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵAngleDoubleDownIcon_BaseFactory;
    return function AngleDoubleDownIcon_Factory(t) {
      return (ɵAngleDoubleDownIcon_BaseFactory || (ɵAngleDoubleDownIcon_BaseFactory = ɵɵgetInheritedFactory(_AngleDoubleDownIcon)))(t || _AngleDoubleDownIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _AngleDoubleDownIcon,
    selectors: [["AngleDoubleDownIcon"]],
    standalone: true,
    features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    decls: 2,
    vars: 5,
    consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M6.70786 6.59831C6.80043 6.63674 6.89974 6.65629 6.99997 6.65581C7.19621 6.64081 7.37877 6.54953 7.50853 6.40153L11.0685 2.8416C11.1364 2.69925 11.1586 2.53932 11.132 2.38384C11.1053 2.22837 11.0311 2.08498 10.9195 1.97343C10.808 1.86188 10.6646 1.78766 10.5091 1.76099C10.3536 1.73431 10.1937 1.75649 10.0513 1.82448L6.99997 4.87585L3.9486 1.82448C3.80625 1.75649 3.64632 1.73431 3.49084 1.76099C3.33536 1.78766 3.19197 1.86188 3.08043 1.97343C2.96888 2.08498 2.89466 2.22837 2.86798 2.38384C2.84131 2.53932 2.86349 2.69925 2.93147 2.8416L6.46089 6.43205C6.53132 6.50336 6.61528 6.55989 6.70786 6.59831ZM6.70786 12.1925C6.80043 12.2309 6.89974 12.2505 6.99997 12.25C7.10241 12.2465 7.20306 12.2222 7.29575 12.1785C7.38845 12.1348 7.47124 12.0726 7.53905 11.9957L11.0685 8.46629C11.1614 8.32292 11.2036 8.15249 11.1881 7.98233C11.1727 7.81216 11.1005 7.6521 10.9833 7.52781C10.866 7.40353 10.7104 7.3222 10.5415 7.29688C10.3725 7.27155 10.1999 7.30369 10.0513 7.38814L6.99997 10.4395L3.9486 7.38814C3.80006 7.30369 3.62747 7.27155 3.45849 7.29688C3.28951 7.3222 3.13393 7.40353 3.01667 7.52781C2.89942 7.6521 2.82729 7.81216 2.81184 7.98233C2.79639 8.15249 2.83852 8.32292 2.93148 8.46629L6.4609 12.0262C6.53133 12.0975 6.61529 12.1541 6.70786 12.1925Z", "fill", "currentColor"]],
    template: function AngleDoubleDownIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵnamespaceSVG();
        ɵɵelementStart(0, "svg", 0);
        ɵɵelement(1, "path", 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.getClassNames());
        ɵɵattribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDoubleDownIcon, [{
    type: Component,
    args: [{
      selector: "AngleDoubleDownIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.70786 6.59831C6.80043 6.63674 6.89974 6.65629 6.99997 6.65581C7.19621 6.64081 7.37877 6.54953 7.50853 6.40153L11.0685 2.8416C11.1364 2.69925 11.1586 2.53932 11.132 2.38384C11.1053 2.22837 11.0311 2.08498 10.9195 1.97343C10.808 1.86188 10.6646 1.78766 10.5091 1.76099C10.3536 1.73431 10.1937 1.75649 10.0513 1.82448L6.99997 4.87585L3.9486 1.82448C3.80625 1.75649 3.64632 1.73431 3.49084 1.76099C3.33536 1.78766 3.19197 1.86188 3.08043 1.97343C2.96888 2.08498 2.89466 2.22837 2.86798 2.38384C2.84131 2.53932 2.86349 2.69925 2.93147 2.8416L6.46089 6.43205C6.53132 6.50336 6.61528 6.55989 6.70786 6.59831ZM6.70786 12.1925C6.80043 12.2309 6.89974 12.2505 6.99997 12.25C7.10241 12.2465 7.20306 12.2222 7.29575 12.1785C7.38845 12.1348 7.47124 12.0726 7.53905 11.9957L11.0685 8.46629C11.1614 8.32292 11.2036 8.15249 11.1881 7.98233C11.1727 7.81216 11.1005 7.6521 10.9833 7.52781C10.866 7.40353 10.7104 7.3222 10.5415 7.29688C10.3725 7.27155 10.1999 7.30369 10.0513 7.38814L6.99997 10.4395L3.9486 7.38814C3.80006 7.30369 3.62747 7.27155 3.45849 7.29688C3.28951 7.3222 3.13393 7.40353 3.01667 7.52781C2.89942 7.6521 2.82729 7.81216 2.81184 7.98233C2.79639 8.15249 2.83852 8.32292 2.93148 8.46629L6.4609 12.0262C6.53133 12.0975 6.61529 12.1541 6.70786 12.1925Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// ../../node_modules/primeng/fesm2022/primeng-icons-angledoubleup.mjs
var AngleDoubleUpIcon = class _AngleDoubleUpIcon extends BaseIcon {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵAngleDoubleUpIcon_BaseFactory;
    return function AngleDoubleUpIcon_Factory(t) {
      return (ɵAngleDoubleUpIcon_BaseFactory || (ɵAngleDoubleUpIcon_BaseFactory = ɵɵgetInheritedFactory(_AngleDoubleUpIcon)))(t || _AngleDoubleUpIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _AngleDoubleUpIcon,
    selectors: [["AngleDoubleUpIcon"]],
    standalone: true,
    features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    decls: 2,
    vars: 5,
    consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M10.1504 6.67719C10.2417 6.71508 10.3396 6.73436 10.4385 6.73389C10.6338 6.74289 10.8249 6.67441 10.97 6.54334C11.1109 6.4023 11.19 6.21112 11.19 6.01178C11.19 5.81245 11.1109 5.62127 10.97 5.48023L7.45977 1.96998C7.31873 1.82912 7.12755 1.75 6.92821 1.75C6.72888 1.75 6.5377 1.82912 6.39666 1.96998L2.9165 5.45014C2.83353 5.58905 2.79755 5.751 2.81392 5.91196C2.83028 6.07293 2.89811 6.22433 3.00734 6.34369C3.11656 6.46306 3.26137 6.54402 3.42025 6.57456C3.57914 6.60511 3.74364 6.5836 3.88934 6.51325L6.89813 3.50446L9.90691 6.51325C9.97636 6.58357 10.0592 6.6393 10.1504 6.67719ZM9.93702 11.9993C10.065 12.1452 10.245 12.2352 10.4385 12.25C10.632 12.2352 10.812 12.1452 10.9399 11.9993C11.0633 11.8614 11.1315 11.6828 11.1315 11.4978C11.1315 11.3128 11.0633 11.1342 10.9399 10.9963L7.48987 7.48609C7.34883 7.34523 7.15765 7.26611 6.95832 7.26611C6.75899 7.26611 6.5678 7.34523 6.42677 7.48609L2.91652 10.9963C2.84948 11.1367 2.82761 11.2944 2.85391 11.4477C2.88022 11.601 2.9534 11.7424 3.06339 11.8524C3.17338 11.9624 3.31477 12.0356 3.46808 12.0619C3.62139 12.0882 3.77908 12.0663 3.91945 11.9993L6.92823 8.99048L9.93702 11.9993Z", "fill", "currentColor"]],
    template: function AngleDoubleUpIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵnamespaceSVG();
        ɵɵelementStart(0, "svg", 0);
        ɵɵelement(1, "path", 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.getClassNames());
        ɵɵattribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDoubleUpIcon, [{
    type: Component,
    args: [{
      selector: "AngleDoubleUpIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.1504 6.67719C10.2417 6.71508 10.3396 6.73436 10.4385 6.73389C10.6338 6.74289 10.8249 6.67441 10.97 6.54334C11.1109 6.4023 11.19 6.21112 11.19 6.01178C11.19 5.81245 11.1109 5.62127 10.97 5.48023L7.45977 1.96998C7.31873 1.82912 7.12755 1.75 6.92821 1.75C6.72888 1.75 6.5377 1.82912 6.39666 1.96998L2.9165 5.45014C2.83353 5.58905 2.79755 5.751 2.81392 5.91196C2.83028 6.07293 2.89811 6.22433 3.00734 6.34369C3.11656 6.46306 3.26137 6.54402 3.42025 6.57456C3.57914 6.60511 3.74364 6.5836 3.88934 6.51325L6.89813 3.50446L9.90691 6.51325C9.97636 6.58357 10.0592 6.6393 10.1504 6.67719ZM9.93702 11.9993C10.065 12.1452 10.245 12.2352 10.4385 12.25C10.632 12.2352 10.812 12.1452 10.9399 11.9993C11.0633 11.8614 11.1315 11.6828 11.1315 11.4978C11.1315 11.3128 11.0633 11.1342 10.9399 10.9963L7.48987 7.48609C7.34883 7.34523 7.15765 7.26611 6.95832 7.26611C6.75899 7.26611 6.5678 7.34523 6.42677 7.48609L2.91652 10.9963C2.84948 11.1367 2.82761 11.2944 2.85391 11.4477C2.88022 11.601 2.9534 11.7424 3.06339 11.8524C3.17338 11.9624 3.31477 12.0356 3.46808 12.0619C3.62139 12.0882 3.77908 12.0663 3.91945 11.9993L6.92823 8.99048L9.93702 11.9993Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// ../../node_modules/primeng/fesm2022/primeng-icons-home.mjs
var HomeIcon = class _HomeIcon extends BaseIcon {
  pathId;
  ngOnInit() {
    this.pathId = "url(#" + UniqueComponentId() + ")";
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵHomeIcon_BaseFactory;
    return function HomeIcon_Factory(t) {
      return (ɵHomeIcon_BaseFactory || (ɵHomeIcon_BaseFactory = ɵɵgetInheritedFactory(_HomeIcon)))(t || _HomeIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _HomeIcon,
    selectors: [["HomeIcon"]],
    standalone: true,
    features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    decls: 6,
    vars: 7,
    consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M13.4175 6.79971C13.2874 6.80029 13.1608 6.75807 13.057 6.67955L12.4162 6.19913V12.6073C12.4141 12.7659 12.3502 12.9176 12.2379 13.0298C12.1257 13.142 11.9741 13.206 11.8154 13.208H8.61206C8.61179 13.208 8.61151 13.208 8.61123 13.2081C8.61095 13.208 8.61068 13.208 8.6104 13.208H5.41076C5.40952 13.208 5.40829 13.2081 5.40705 13.2081C5.40581 13.2081 5.40458 13.208 5.40334 13.208H2.20287C2.04418 13.206 1.89257 13.142 1.78035 13.0298C1.66813 12.9176 1.60416 12.7659 1.60209 12.6073V6.19914L0.961256 6.67955C0.833786 6.77515 0.673559 6.8162 0.515823 6.79367C0.358086 6.77114 0.215762 6.68686 0.120159 6.55939C0.0245566 6.43192 -0.0164931 6.2717 0.00604063 6.11396C0.0285744 5.95622 0.112846 5.8139 0.240316 5.7183L1.83796 4.52007L1.84689 4.51337L6.64868 0.912027C6.75267 0.834032 6.87915 0.79187 7.00915 0.79187C7.13914 0.79187 7.26562 0.834032 7.36962 0.912027L12.1719 4.51372L12.1799 4.51971L13.778 5.7183C13.8943 5.81278 13.9711 5.94732 13.9934 6.09553C14.0156 6.24373 13.9816 6.39489 13.8981 6.51934C13.8471 6.60184 13.7766 6.67054 13.6928 6.71942C13.609 6.76831 13.5144 6.79587 13.4175 6.79971ZM6.00783 12.0065H8.01045V7.60074H6.00783V12.0065ZM9.21201 12.0065V6.99995C9.20994 6.84126 9.14598 6.68965 9.03375 6.57743C8.92153 6.46521 8.76992 6.40124 8.61123 6.39917H5.40705C5.24836 6.40124 5.09675 6.46521 4.98453 6.57743C4.8723 6.68965 4.80834 6.84126 4.80627 6.99995V12.0065H2.80366V5.29836L7.00915 2.14564L11.2146 5.29836V12.0065H9.21201Z", "fill", "currentColor"], [3, "id"], ["width", "14", "height", "14", "fill", "white"]],
    template: function HomeIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵnamespaceSVG();
        ɵɵelementStart(0, "svg", 0)(1, "g");
        ɵɵelement(2, "path", 1);
        ɵɵelementEnd();
        ɵɵelementStart(3, "defs")(4, "clipPath", 2);
        ɵɵelement(5, "rect", 3);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.getClassNames());
        ɵɵattribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
        ɵɵadvance();
        ɵɵattribute("clip-path", ctx.pathId);
        ɵɵadvance(3);
        ɵɵproperty("id", ctx.pathId);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeIcon, [{
    type: Component,
    args: [{
      selector: "HomeIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.4175 6.79971C13.2874 6.80029 13.1608 6.75807 13.057 6.67955L12.4162 6.19913V12.6073C12.4141 12.7659 12.3502 12.9176 12.2379 13.0298C12.1257 13.142 11.9741 13.206 11.8154 13.208H8.61206C8.61179 13.208 8.61151 13.208 8.61123 13.2081C8.61095 13.208 8.61068 13.208 8.6104 13.208H5.41076C5.40952 13.208 5.40829 13.2081 5.40705 13.2081C5.40581 13.2081 5.40458 13.208 5.40334 13.208H2.20287C2.04418 13.206 1.89257 13.142 1.78035 13.0298C1.66813 12.9176 1.60416 12.7659 1.60209 12.6073V6.19914L0.961256 6.67955C0.833786 6.77515 0.673559 6.8162 0.515823 6.79367C0.358086 6.77114 0.215762 6.68686 0.120159 6.55939C0.0245566 6.43192 -0.0164931 6.2717 0.00604063 6.11396C0.0285744 5.95622 0.112846 5.8139 0.240316 5.7183L1.83796 4.52007L1.84689 4.51337L6.64868 0.912027C6.75267 0.834032 6.87915 0.79187 7.00915 0.79187C7.13914 0.79187 7.26562 0.834032 7.36962 0.912027L12.1719 4.51372L12.1799 4.51971L13.778 5.7183C13.8943 5.81278 13.9711 5.94732 13.9934 6.09553C14.0156 6.24373 13.9816 6.39489 13.8981 6.51934C13.8471 6.60184 13.7766 6.67054 13.6928 6.71942C13.609 6.76831 13.5144 6.79587 13.4175 6.79971ZM6.00783 12.0065H8.01045V7.60074H6.00783V12.0065ZM9.21201 12.0065V6.99995C9.20994 6.84126 9.14598 6.68965 9.03375 6.57743C8.92153 6.46521 8.76992 6.40124 8.61123 6.39917H5.40705C5.24836 6.40124 5.09675 6.46521 4.98453 6.57743C4.8723 6.68965 4.80834 6.84126 4.80627 6.99995V12.0065H2.80366V5.29836L7.00915 2.14564L11.2146 5.29836V12.0065H9.21201Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// ../../node_modules/primeng/fesm2022/primeng-picklist.mjs
var _c02 = ["sourcelist"];
var _c12 = ["targetlist"];
var _c2 = ["sourceFilter"];
var _c3 = ["targetFilter"];
function PickList_div_1_AngleUpIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "moveupicon");
  }
}
function PickList_div_1_3_ng_template_0_Template(rf, ctx) {
}
function PickList_div_1_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_1_3_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_1_AngleDoubleUpIcon_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movetopicon");
  }
}
function PickList_div_1_6_ng_template_0_Template(rf, ctx) {
}
function PickList_div_1_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_1_6_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_1_AngleDownIcon_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movedownicon");
  }
}
function PickList_div_1_9_ng_template_0_Template(rf, ctx) {
}
function PickList_div_1_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_1_9_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_1_AngleDoubleDownIcon_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movebottomicon");
  }
}
function PickList_div_1_12_ng_template_0_Template(rf, ctx) {
}
function PickList_div_1_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_1_12_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 16)(1, "button", 10);
    ɵɵlistener("click", function PickList_div_1_Template_button_click_1_listener() {
      ɵɵrestoreView(_r33);
      const ctx_r32 = ɵɵnextContext();
      const _r3 = ɵɵreference(6);
      return ɵɵresetView(ctx_r32.moveUp(_r3, ctx_r32.source, ctx_r32.selectedItemsSource, ctx_r32.onSourceReorder, ctx_r32.SOURCE_LIST));
    });
    ɵɵtemplate(2, PickList_div_1_AngleUpIcon_2_Template, 1, 1, "AngleUpIcon", 8)(3, PickList_div_1_3_Template, 1, 0, null, 17);
    ɵɵelementEnd();
    ɵɵelementStart(4, "button", 10);
    ɵɵlistener("click", function PickList_div_1_Template_button_click_4_listener() {
      ɵɵrestoreView(_r33);
      const ctx_r34 = ɵɵnextContext();
      const _r3 = ɵɵreference(6);
      return ɵɵresetView(ctx_r34.moveTop(_r3, ctx_r34.source, ctx_r34.selectedItemsSource, ctx_r34.onSourceReorder, ctx_r34.SOURCE_LIST));
    });
    ɵɵtemplate(5, PickList_div_1_AngleDoubleUpIcon_5_Template, 1, 1, "AngleDoubleUpIcon", 8)(6, PickList_div_1_6_Template, 1, 0, null, 17);
    ɵɵelementEnd();
    ɵɵelementStart(7, "button", 10);
    ɵɵlistener("click", function PickList_div_1_Template_button_click_7_listener() {
      ɵɵrestoreView(_r33);
      const ctx_r35 = ɵɵnextContext();
      const _r3 = ɵɵreference(6);
      return ɵɵresetView(ctx_r35.moveDown(_r3, ctx_r35.source, ctx_r35.selectedItemsSource, ctx_r35.onSourceReorder, ctx_r35.SOURCE_LIST));
    });
    ɵɵtemplate(8, PickList_div_1_AngleDownIcon_8_Template, 1, 1, "AngleDownIcon", 8)(9, PickList_div_1_9_Template, 1, 0, null, 17);
    ɵɵelementEnd();
    ɵɵelementStart(10, "button", 10);
    ɵɵlistener("click", function PickList_div_1_Template_button_click_10_listener() {
      ɵɵrestoreView(_r33);
      const ctx_r36 = ɵɵnextContext();
      const _r3 = ɵɵreference(6);
      return ɵɵresetView(ctx_r36.moveBottom(_r3, ctx_r36.source, ctx_r36.selectedItemsSource, ctx_r36.onSourceReorder, ctx_r36.SOURCE_LIST));
    });
    ɵɵtemplate(11, PickList_div_1_AngleDoubleDownIcon_11_Template, 1, 1, "AngleDoubleDownIcon", 8)(12, PickList_div_1_12_Template, 1, 0, null, 17);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "sourceControls")("data-pc-group-section", "controls");
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r0.sourceMoveDisabled());
    ɵɵattribute("aria-label", ctx_r0.moveUpAriaLabel)("data-pc-section", "sourceMoveUpButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.moveUpIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.moveUpIconTemplate);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r0.sourceMoveDisabled());
    ɵɵattribute("aria-label", ctx_r0.moveTopAriaLabel)("data-pc-section", "sourceMoveTopButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.moveTopIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.moveTopIconTemplate);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r0.sourceMoveDisabled());
    ɵɵattribute("aria-label", ctx_r0.moveDownAriaLabel)("data-pc-section", "sourceMoveDownButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.moveDownIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.moveDownIconTemplate);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r0.sourceMoveDisabled());
    ɵɵattribute("aria-label", ctx_r0.moveBottomAriaLabel)("data-pc-section", "sourceMoveBottomButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.moveBottomIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.moveBottomIconTemplate);
  }
}
function PickList_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 20);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r37 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r37.sourceHeader);
  }
}
function PickList_div_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 18);
    ɵɵtemplate(1, PickList_div_3_div_1_Template, 2, 1, "div", 19)(2, PickList_div_3_ng_container_2_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "sourceHeader")("data-pc-group-section", "header");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.sourceHeaderTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.sourceHeaderTemplate);
  }
}
function PickList_div_4_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c4 = (a0) => ({
  options: a0
});
function PickList_div_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_div_4_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r39 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r39.sourceFilterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c4, ctx_r39.sourceFilterOptions));
  }
}
function PickList_div_4_ng_template_2_SearchIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "SearchIcon", 29);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-picklist-filter-icon");
    ɵɵattribute("data-pc-section", "sourcefilterIcon");
  }
}
function PickList_div_4_ng_template_2_span_4_1_ng_template_0_Template(rf, ctx) {
}
function PickList_div_4_ng_template_2_span_4_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_4_ng_template_2_span_4_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_4_ng_template_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 30);
    ɵɵtemplate(1, PickList_div_4_ng_template_2_span_4_1_Template, 1, 0, null, 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r45 = ɵɵnextContext(3);
    ɵɵattribute("data-pc-section", "sourcefilterIcon");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r45.sourceFilterIconTemplate);
  }
}
function PickList_div_4_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24)(1, "input", 25, 26);
    ɵɵlistener("keyup", function PickList_div_4_ng_template_2_Template_input_keyup_1_listener($event) {
      ɵɵrestoreView(_r49);
      const ctx_r48 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r48.onFilter($event, ctx_r48.SOURCE_LIST));
    });
    ɵɵelementEnd();
    ɵɵtemplate(3, PickList_div_4_ng_template_2_SearchIcon_3_Template, 1, 2, "SearchIcon", 27)(4, PickList_div_4_ng_template_2_span_4_Template, 2, 2, "span", 28);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r40 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "sourceFilter");
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r40.disabled);
    ɵɵattribute("placeholder", ctx_r40.sourceFilterPlaceholder)("aria-label", ctx_r40.ariaSourceFilterLabel)("data-pc-section", "sourceFilterInput");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r40.sourceFilterIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r40.sourceFilterIconTemplate);
  }
}
function PickList_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 21);
    ɵɵtemplate(1, PickList_div_4_ng_container_1_Template, 2, 4, "ng-container", 22)(2, PickList_div_4_ng_template_2_Template, 5, 7, "ng-template", null, 23, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const _r41 = ɵɵreference(3);
    const ctx_r2 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "sourceFilterContainer");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.sourceFilterTemplate)("ngIfElse", _r41);
  }
}
function PickList_ng_template_7_li_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c5 = (a1, a2) => ({
  "p-picklist-item": true,
  "p-highlight": a1,
  "p-disabled": a2
});
var _c6 = (a0, a1) => ({
  $implicit: a0,
  index: a1
});
function PickList_ng_template_7_li_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 32);
    ɵɵlistener("click", function PickList_ng_template_7_li_0_Template_li_click_0_listener($event) {
      ɵɵrestoreView(_r57);
      const ctx_r56 = ɵɵnextContext();
      const item_r50 = ctx_r56.$implicit;
      const i_r51 = ctx_r56.index;
      const ctx_r55 = ɵɵnextContext();
      return ɵɵresetView(ctx_r55.onItemClick($event, item_r50, ctx_r55.selectedItemsSource, ctx_r55.onSourceSelect, ctx_r55.idSource + "_" + i_r51));
    })("mousedown", function PickList_ng_template_7_li_0_Template_li_mousedown_0_listener() {
      ɵɵrestoreView(_r57);
      const i_r51 = ɵɵnextContext().index;
      const ctx_r58 = ɵɵnextContext();
      return ɵɵresetView(ctx_r58.onOptionMouseDown(i_r51, ctx_r58.SOURCE_LIST));
    })("dblclick", function PickList_ng_template_7_li_0_Template_li_dblclick_0_listener() {
      ɵɵrestoreView(_r57);
      const ctx_r60 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r60.onSourceItemDblClick());
    })("touchend", function PickList_ng_template_7_li_0_Template_li_touchend_0_listener() {
      ɵɵrestoreView(_r57);
      const ctx_r61 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r61.onItemTouchEnd());
    });
    ɵɵtemplate(1, PickList_ng_template_7_li_0_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r62 = ɵɵnextContext();
    const item_r50 = ctx_r62.$implicit;
    const i_r51 = ctx_r62.index;
    const ctx_r53 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(9, _c5, ctx_r53.isSelected(item_r50, ctx_r53.selectedItemsSource), ctx_r53.disabled))("id", ctx_r53.idSource + "_" + i_r51)("ngClass", ctx_r53.itemClass(item_r50, ctx_r53.idSource + "_" + i_r51, ctx_r53.selectedItemsSource))("cdkDragData", item_r50)("cdkDragDisabled", !ctx_r53.dragdrop);
    ɵɵattribute("data-pc-section", "item")("aria-selected", ctx_r53.isSelected(item_r50, ctx_r53.selectedItemsSource));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r53.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(12, _c6, item_r50, i_r51));
  }
}
function PickList_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_ng_template_7_li_0_Template, 2, 15, "li", 31);
  }
  if (rf & 2) {
    const item_r50 = ctx.$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r4.isItemVisible(item_r50, ctx_r4.SOURCE_LIST));
  }
}
function PickList_ng_container_8_li_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_ng_container_8_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 34);
    ɵɵtemplate(1, PickList_ng_container_8_li_1_ng_container_1_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r63 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "sourceEmptyMessage");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r63.emptyMessageSourceTemplate);
  }
}
function PickList_ng_container_8_li_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_ng_container_8_li_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 34);
    ɵɵtemplate(1, PickList_ng_container_8_li_2_ng_container_1_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r64 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "sourceEmptyMessage");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r64.emptyFilterMessageSourceTemplate);
  }
}
function PickList_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_ng_container_8_li_1_Template, 2, 2, "li", 33)(2, PickList_ng_container_8_li_2_Template, 2, 2, "li", 33);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r5.filterValueSource || !ctx_r5.emptyFilterMessageSourceTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r5.filterValueSource);
  }
}
function PickList_ng_container_11_AngleRightIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleRightIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movetotargeticon");
  }
}
function PickList_ng_container_11_AngleDownIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movetotargeticon");
  }
}
function PickList_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_ng_container_11_AngleRightIcon_1_Template, 1, 1, "AngleRightIcon", 8)(2, PickList_ng_container_11_AngleDownIcon_2_Template, 1, 1, "AngleDownIcon", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r6.viewChanged);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r6.viewChanged);
  }
}
function PickList_12_ng_template_0_Template(rf, ctx) {
}
function PickList_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_12_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_ng_container_14_AngleDoubleRightIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleRightIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movealltotargeticon");
  }
}
function PickList_ng_container_14_AngleDoubleDownIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movealltotargeticon");
  }
}
function PickList_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_ng_container_14_AngleDoubleRightIcon_1_Template, 1, 1, "AngleDoubleRightIcon", 8)(2, PickList_ng_container_14_AngleDoubleDownIcon_2_Template, 1, 1, "AngleDoubleDownIcon", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r8 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r8.viewChanged);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r8.viewChanged);
  }
}
function PickList_15_ng_template_0_Template(rf, ctx) {
}
function PickList_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_15_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_ng_container_17_AngleLeftIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleLeftIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movedownsourceticon");
  }
}
function PickList_ng_container_17_AngleUpIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movedownsourceticon");
  }
}
function PickList_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_ng_container_17_AngleLeftIcon_1_Template, 1, 1, "AngleLeftIcon", 8)(2, PickList_ng_container_17_AngleUpIcon_2_Template, 1, 1, "AngleUpIcon", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r10 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r10.viewChanged);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r10.viewChanged);
  }
}
function PickList_18_ng_template_0_Template(rf, ctx) {
}
function PickList_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_18_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_ng_container_20_AngleDoubleLeftIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleLeftIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movealltosourceticon");
  }
}
function PickList_ng_container_20_AngleDoubleUpIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movealltosourceticon");
  }
}
function PickList_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_ng_container_20_AngleDoubleLeftIcon_1_Template, 1, 1, "AngleDoubleLeftIcon", 8)(2, PickList_ng_container_20_AngleDoubleUpIcon_2_Template, 1, 1, "AngleDoubleUpIcon", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r12 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r12.viewChanged);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r12.viewChanged);
  }
}
function PickList_21_ng_template_0_Template(rf, ctx) {
}
function PickList_21_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_21_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_23_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 20);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r79 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r79.targetHeader);
  }
}
function PickList_div_23_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_div_23_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 18);
    ɵɵtemplate(1, PickList_div_23_div_1_Template, 2, 1, "div", 19)(2, PickList_div_23_ng_container_2_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r14 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "targetHead")("data-pc-group-section", "header");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r14.targetHeaderTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r14.targetHeaderTemplate);
  }
}
function PickList_div_24_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_div_24_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_div_24_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r81 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r81.targetFilterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c4, ctx_r81.targetFilterOptions));
  }
}
function PickList_div_24_ng_template_2_SearchIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "SearchIcon", 29);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-picklist-filter-icon");
    ɵɵattribute("data-pc-section", "targetfiltericon");
  }
}
function PickList_div_24_ng_template_2_span_4_1_ng_template_0_Template(rf, ctx) {
}
function PickList_div_24_ng_template_2_span_4_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_24_ng_template_2_span_4_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_24_ng_template_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 30);
    ɵɵtemplate(1, PickList_div_24_ng_template_2_span_4_1_Template, 1, 0, null, 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r87 = ɵɵnextContext(3);
    ɵɵattribute("data-pc-section", "targetfiltericon");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r87.targetFilterIconTemplate);
  }
}
function PickList_div_24_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r91 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 24)(1, "input", 25, 36);
    ɵɵlistener("keyup", function PickList_div_24_ng_template_2_Template_input_keyup_1_listener($event) {
      ɵɵrestoreView(_r91);
      const ctx_r90 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r90.onFilter($event, ctx_r90.TARGET_LIST));
    });
    ɵɵelementEnd();
    ɵɵtemplate(3, PickList_div_24_ng_template_2_SearchIcon_3_Template, 1, 2, "SearchIcon", 27)(4, PickList_div_24_ng_template_2_span_4_Template, 2, 2, "span", 28);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r82 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "targetFilter");
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r82.disabled);
    ɵɵattribute("placeholder", ctx_r82.targetFilterPlaceholder)("aria-label", ctx_r82.ariaTargetFilterLabel)("data-pc-section", "targetFilterInput");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r82.targetFilterIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r82.targetFilterIconTemplate);
  }
}
function PickList_div_24_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 21);
    ɵɵtemplate(1, PickList_div_24_ng_container_1_Template, 2, 4, "ng-container", 22)(2, PickList_div_24_ng_template_2_Template, 5, 7, "ng-template", null, 35, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const _r83 = ɵɵreference(3);
    const ctx_r15 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "targetFilterContainer");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r15.targetFilterTemplate)("ngIfElse", _r83);
  }
}
function PickList_ng_template_27_li_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_ng_template_27_li_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r99 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 32);
    ɵɵlistener("click", function PickList_ng_template_27_li_0_Template_li_click_0_listener($event) {
      ɵɵrestoreView(_r99);
      const ctx_r98 = ɵɵnextContext();
      const item_r92 = ctx_r98.$implicit;
      const i_r93 = ctx_r98.index;
      const ctx_r97 = ɵɵnextContext();
      return ɵɵresetView(ctx_r97.onItemClick($event, item_r92, ctx_r97.selectedItemsTarget, ctx_r97.onTargetSelect, ctx_r97.idTarget + "_" + i_r93));
    })("mousedown", function PickList_ng_template_27_li_0_Template_li_mousedown_0_listener() {
      ɵɵrestoreView(_r99);
      const i_r93 = ɵɵnextContext().index;
      const ctx_r100 = ɵɵnextContext();
      return ɵɵresetView(ctx_r100.onOptionMouseDown(i_r93, ctx_r100.TARGET_LIST));
    })("dblclick", function PickList_ng_template_27_li_0_Template_li_dblclick_0_listener() {
      ɵɵrestoreView(_r99);
      const ctx_r102 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r102.onTargetItemDblClick());
    })("touchend", function PickList_ng_template_27_li_0_Template_li_touchend_0_listener() {
      ɵɵrestoreView(_r99);
      const ctx_r103 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r103.onItemTouchEnd());
    });
    ɵɵtemplate(1, PickList_ng_template_27_li_0_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r104 = ɵɵnextContext();
    const item_r92 = ctx_r104.$implicit;
    const i_r93 = ctx_r104.index;
    const ctx_r95 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(9, _c5, ctx_r95.isSelected(item_r92, ctx_r95.selectedItemsTarget), ctx_r95.disabled))("id", ctx_r95.idTarget + "_" + i_r93)("ngClass", ctx_r95.itemClass(item_r92, ctx_r95.idTarget + "_" + i_r93, ctx_r95.selectedItemsTarget))("cdkDragData", item_r92)("cdkDragDisabled", !ctx_r95.dragdrop);
    ɵɵattribute("data-pc-section", "item")("aria-selected", ctx_r95.isSelected(item_r92, ctx_r95.selectedItemsTarget));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r95.itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(12, _c6, item_r92, i_r93));
  }
}
function PickList_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_ng_template_27_li_0_Template, 2, 15, "li", 31);
  }
  if (rf & 2) {
    const item_r92 = ctx.$implicit;
    const ctx_r17 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r17.isItemVisible(item_r92, ctx_r17.TARGET_LIST));
  }
}
function PickList_ng_container_28_li_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_ng_container_28_li_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 34);
    ɵɵtemplate(1, PickList_ng_container_28_li_1_ng_container_1_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r105 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "targetEmptyMessage");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r105.emptyMessageTargetTemplate);
  }
}
function PickList_ng_container_28_li_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function PickList_ng_container_28_li_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 34);
    ɵɵtemplate(1, PickList_ng_container_28_li_2_ng_container_1_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r106 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "targetEmptyMessage");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r106.emptyFilterMessageTargetTemplate);
  }
}
function PickList_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, PickList_ng_container_28_li_1_Template, 2, 2, "li", 33)(2, PickList_ng_container_28_li_2_Template, 2, 2, "li", 33);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r18 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r18.filterValueTarget || !ctx_r18.emptyFilterMessageTargetTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r18.filterValueTarget);
  }
}
function PickList_div_29_AngleUpIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "moveupicon");
  }
}
function PickList_div_29_3_ng_template_0_Template(rf, ctx) {
}
function PickList_div_29_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_29_3_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_29_AngleDoubleUpIcon_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movetopicon");
  }
}
function PickList_div_29_6_ng_template_0_Template(rf, ctx) {
}
function PickList_div_29_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_29_6_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_29_AngleDownIcon_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movedownicon");
  }
}
function PickList_div_29_9_ng_template_0_Template(rf, ctx) {
}
function PickList_div_29_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_29_9_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_29_AngleDoubleDownIcon_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movebottomicon");
  }
}
function PickList_div_29_12_ng_template_0_Template(rf, ctx) {
}
function PickList_div_29_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, PickList_div_29_12_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function PickList_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r122 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 37)(1, "button", 10);
    ɵɵlistener("click", function PickList_div_29_Template_button_click_1_listener() {
      ɵɵrestoreView(_r122);
      const ctx_r121 = ɵɵnextContext();
      const _r16 = ɵɵreference(26);
      return ɵɵresetView(ctx_r121.moveUp(_r16, ctx_r121.target, ctx_r121.selectedItemsTarget, ctx_r121.onTargetReorder, ctx_r121.TARGET_LIST));
    });
    ɵɵtemplate(2, PickList_div_29_AngleUpIcon_2_Template, 1, 1, "AngleUpIcon", 8)(3, PickList_div_29_3_Template, 1, 0, null, 17);
    ɵɵelementEnd();
    ɵɵelementStart(4, "button", 10);
    ɵɵlistener("click", function PickList_div_29_Template_button_click_4_listener() {
      ɵɵrestoreView(_r122);
      const ctx_r123 = ɵɵnextContext();
      const _r16 = ɵɵreference(26);
      return ɵɵresetView(ctx_r123.moveTop(_r16, ctx_r123.target, ctx_r123.selectedItemsTarget, ctx_r123.onTargetReorder, ctx_r123.TARGET_LIST));
    });
    ɵɵtemplate(5, PickList_div_29_AngleDoubleUpIcon_5_Template, 1, 1, "AngleDoubleUpIcon", 8)(6, PickList_div_29_6_Template, 1, 0, null, 17);
    ɵɵelementEnd();
    ɵɵelementStart(7, "button", 10);
    ɵɵlistener("click", function PickList_div_29_Template_button_click_7_listener() {
      ɵɵrestoreView(_r122);
      const ctx_r124 = ɵɵnextContext();
      const _r16 = ɵɵreference(26);
      return ɵɵresetView(ctx_r124.moveDown(_r16, ctx_r124.target, ctx_r124.selectedItemsTarget, ctx_r124.onTargetReorder, ctx_r124.TARGET_LIST));
    });
    ɵɵtemplate(8, PickList_div_29_AngleDownIcon_8_Template, 1, 1, "AngleDownIcon", 8)(9, PickList_div_29_9_Template, 1, 0, null, 17);
    ɵɵelementEnd();
    ɵɵelementStart(10, "button", 10);
    ɵɵlistener("click", function PickList_div_29_Template_button_click_10_listener() {
      ɵɵrestoreView(_r122);
      const ctx_r125 = ɵɵnextContext();
      const _r16 = ɵɵreference(26);
      return ɵɵresetView(ctx_r125.moveBottom(_r16, ctx_r125.target, ctx_r125.selectedItemsTarget, ctx_r125.onTargetReorder, ctx_r125.TARGET_LIST));
    });
    ɵɵtemplate(11, PickList_div_29_AngleDoubleDownIcon_11_Template, 1, 1, "AngleDoubleDownIcon", 8)(12, PickList_div_29_12_Template, 1, 0, null, 17);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r19 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "targetControls")("data-pc-group-section", "controls");
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r19.targetMoveDisabled());
    ɵɵattribute("aria-label", ctx_r19.moveUpAriaLabel)("data-pc-section", "targetMoveUpButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r19.moveUpIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r19.moveUpIconTemplate);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r19.targetMoveDisabled());
    ɵɵattribute("aria-label", ctx_r19.moveTopAriaLabel)("data-pc-section", "targetMoveTopButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r19.moveTopIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r19.moveTopIconTemplate);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r19.targetMoveDisabled());
    ɵɵattribute("aria-label", ctx_r19.moveDownAriaLabel)("data-pc-section", "targetMoveDownButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r19.moveDownIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r19.moveDownIconTemplate);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r19.targetMoveDisabled());
    ɵɵattribute("aria-label", ctx_r19.moveBottomAriaLabel)("data-pc-section", "targetMoveBottomButton");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r19.moveBottomIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r19.moveBottomIconTemplate);
  }
}
var _c7 = (a1) => ({
  "p-picklist p-component": true,
  "p-picklist-striped": a1
});
var _c8 = (a0) => ({
  $implicit: a0
});
var PickList = class _PickList {
  document;
  platformId;
  renderer;
  el;
  cd;
  filterService;
  config;
  /**
   * An array of objects for the source list.
   * @group Props
   */
  source;
  /**
   * An array of objects for the target list.
   * @group Props
   */
  target;
  /**
   * Text for the source list caption
   * @group Props
   */
  sourceHeader;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Defines a string that labels the move to right button for accessibility.
   * @group Props
   */
  rightButtonAriaLabel;
  /**
   * Defines a string that labels the move to left button for accessibility.
   * @group Props
   */
  leftButtonAriaLabel;
  /**
   * Defines a string that labels the move to all right button for accessibility.
   * @group Props
   */
  allRightButtonAriaLabel;
  /**
   * Defines a string that labels the move to all left button for accessibility.
   * @group Props
   */
  allLeftButtonAriaLabel;
  /**
   * Defines a string that labels the move to up button for accessibility.
   * @group Props
   */
  upButtonAriaLabel;
  /**
   * Defines a string that labels the move to down button for accessibility.
   * @group Props
   */
  downButtonAriaLabel;
  /**
   * Defines a string that labels the move to top button for accessibility.
   * @group Props
   */
  topButtonAriaLabel;
  /**
   * Defines a string that labels the move to bottom button for accessibility.
   * @group Props
   */
  bottomButtonAriaLabel;
  /**
   * Text for the target list caption
   * @group Props
   */
  targetHeader;
  /**
   * When enabled orderlist adjusts its controls based on screen size.
   * @group Props
   */
  responsive;
  /**
   * When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).
   * @group Props
   */
  filterBy;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list.
   * @group Props
   */
  trackBy = (index, item) => item;
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity.
   * @group Props
   */
  sourceTrackBy;
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity.
   * @group Props
   */
  targetTrackBy;
  /**
   * Whether to show filter input for source list when filterBy is enabled.
   * @group Props
   */
  showSourceFilter = true;
  /**
   * Whether to show filter input for target list when filterBy is enabled.
   * @group Props
   */
  showTargetFilter = true;
  /**
   * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
   * @group Props
   */
  metaKeySelection = false;
  /**
   * Whether to enable dragdrop based reordering.
   * @group Props
   */
  dragdrop = false;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Inline style of the source list element.
   * @group Props
   */
  sourceStyle;
  /**
   * Inline style of the target list element.
   * @group Props
   */
  targetStyle;
  /**
   * Whether to show buttons of source list.
   * @group Props
   */
  showSourceControls = true;
  /**
   * Whether to show buttons of target list.
   * @group Props
   */
  showTargetControls = true;
  /**
   * Placeholder text on source filter input.
   * @group Props
   */
  sourceFilterPlaceholder;
  /**
   * Placeholder text on target filter input.
   * @group Props
   */
  targetFilterPlaceholder;
  /**
   * When present, it specifies that the component should be disabled.
   * @group Props
   */
  disabled = false;
  /**
   * Defines a string that labels the filter input of source list.
   * @group Props
   */
  ariaSourceFilterLabel;
  /**
   * Defines a string that labels the filter input of target list.
   * @group Props
   */
  ariaTargetFilterLabel;
  /**
   * Defines how the items are filtered.
   * @group Props
   */
  filterMatchMode = "contains";
  /**
   * Whether to displays rows with alternating colors.
   * @group Props
   */
  stripedRows;
  /**
   * Keeps selection on the transfer list.
   * @group Props
   */
  keepSelection = false;
  /**
   * Indicates the width of the screen at which the component should change its behavior.
   * @group Props
   */
  get breakpoint() {
    return this._breakpoint;
  }
  set breakpoint(value) {
    if (value !== this._breakpoint) {
      this._breakpoint = value;
      if (isPlatformBrowser(this.platformId)) {
        this.destroyMedia();
        this.initMedia();
      }
    }
  }
  /**
   * Callback to invoke when items are moved from target to source.
   * @param {PickListMoveToSourceEvent} event - Custom move to source event.
   * @group Emits
   */
  onMoveToSource = new EventEmitter();
  /**
   * Callback to invoke when all items are moved from target to source.
   * @param {PickListMoveAllToSourceEvent} event - Custom move all to source event.
   * @group Emits
   */
  onMoveAllToSource = new EventEmitter();
  /**
   * Callback to invoke when all items are moved from source to target.
   * @param {PickListMoveAllToTargetEvent} event - Custom move all to target event.
   * @group Emits
   */
  onMoveAllToTarget = new EventEmitter();
  /**
   * Callback to invoke when items are moved from source to target.
   * @param {PickListMoveToTargetEvent} event - Custom move to target event.
   * @group Emits
   */
  onMoveToTarget = new EventEmitter();
  /**
   * Callback to invoke when items are reordered within source list.
   * @param {PickListSourceReorderEvent} event - Custom source reorder event.
   * @group Emits
   */
  onSourceReorder = new EventEmitter();
  /**
   * Callback to invoke when items are reordered within target list.
   * @param {PickListTargetReorderEvent} event - Custom target reorder event.
   * @group Emits
   */
  onTargetReorder = new EventEmitter();
  /**
   * Callback to invoke when items are selected within source list.
   * @param {PickListSourceSelectEvent} event - Custom source select event.
   * @group Emits
   */
  onSourceSelect = new EventEmitter();
  /**
   * Callback to invoke when items are selected within target list.
   * @param {PickListTargetSelectEvent} event - Custom target select event.
   * @group Emits
   */
  onTargetSelect = new EventEmitter();
  /**
   * Callback to invoke when the source list is filtered
   * @param {PickListSourceFilterEvent} event - Custom source filter event.
   * @group Emits
   */
  onSourceFilter = new EventEmitter();
  /**
   * Callback to invoke when the target list is filtered
   * @param {PickListTargetFilterEvent} event - Custom target filter event.
   * @group Emits
   */
  onTargetFilter = new EventEmitter();
  /**
   * Callback to invoke when the list is focused
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the list is blurred
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  listViewSourceChild;
  listViewTargetChild;
  sourceFilterViewChild;
  targetFilterViewChild;
  templates;
  get moveUpAriaLabel() {
    return this.upButtonAriaLabel ? this.upButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveUp : void 0;
  }
  get moveTopAriaLabel() {
    return this.topButtonAriaLabel ? this.topButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveTop : void 0;
  }
  get moveDownAriaLabel() {
    return this.downButtonAriaLabel ? this.downButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : void 0;
  }
  get moveBottomAriaLabel() {
    return this.bottomButtonAriaLabel ? this.bottomButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : void 0;
  }
  get moveToTargetAriaLabel() {
    return this.rightButtonAriaLabel ? this.rightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToTarget : void 0;
  }
  get moveAllToTargetAriaLabel() {
    return this.allRightButtonAriaLabel ? this.allRightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToTarget : void 0;
  }
  get moveToSourceAriaLabel() {
    return this.leftButtonAriaLabel ? this.leftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToSource : void 0;
  }
  get moveAllToSourceAriaLabel() {
    return this.allLeftButtonAriaLabel ? this.allLeftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToSource : void 0;
  }
  get idSource() {
    return this.id + "_source";
  }
  get idTarget() {
    return this.id + "_target";
  }
  get focusedOptionId() {
    return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
  }
  _breakpoint = "960px";
  itemTemplate;
  moveTopIconTemplate;
  moveUpIconTemplate;
  moveDownIconTemplate;
  moveBottomIconTemplate;
  moveToTargetIconTemplate;
  moveAllToTargetIconTemplate;
  moveToSourceIconTemplate;
  moveAllToSourceIconTemplate;
  targetFilterIconTemplate;
  sourceFilterIconTemplate;
  visibleOptionsSource;
  visibleOptionsTarget;
  selectedItemsSource = [];
  selectedItemsTarget = [];
  reorderedListElement;
  movedUp;
  movedDown;
  itemTouched;
  styleElement;
  id = UniqueComponentId();
  filterValueSource;
  filterValueTarget;
  fromListType;
  emptyMessageSourceTemplate;
  emptyFilterMessageSourceTemplate;
  emptyMessageTargetTemplate;
  emptyFilterMessageTargetTemplate;
  sourceHeaderTemplate;
  targetHeaderTemplate;
  sourceFilterTemplate;
  targetFilterTemplate;
  sourceFilterOptions;
  targetFilterOptions;
  SOURCE_LIST = -1;
  TARGET_LIST = 1;
  window;
  media;
  viewChanged;
  focusedOptionIndex = -1;
  focusedOption;
  focused = {
    sourceList: false,
    targetList: false
  };
  mediaChangeListener;
  constructor(document2, platformId, renderer, el, cd, filterService, config) {
    this.document = document2;
    this.platformId = platformId;
    this.renderer = renderer;
    this.el = el;
    this.cd = cd;
    this.filterService = filterService;
    this.config = config;
    this.window = this.document.defaultView;
  }
  ngOnInit() {
    if (this.responsive) {
      this.createStyle();
      this.initMedia();
    }
    if (this.filterBy) {
      this.sourceFilterOptions = {
        filter: (value) => this.filterSource(value),
        reset: () => this.resetSourceFilter()
      };
      this.targetFilterOptions = {
        filter: (value) => this.filterTarget(value),
        reset: () => this.resetTargetFilter()
      };
    }
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this.itemTemplate = item.template;
          break;
        case "sourceHeader":
          this.sourceHeaderTemplate = item.template;
          break;
        case "targetHeader":
          this.targetHeaderTemplate = item.template;
          break;
        case "sourceFilter":
          this.sourceFilterTemplate = item.template;
          break;
        case "targetFilter":
          this.targetFilterTemplate = item.template;
          break;
        case "emptymessagesource":
          this.emptyMessageSourceTemplate = item.template;
          break;
        case "emptyfiltermessagesource":
          this.emptyFilterMessageSourceTemplate = item.template;
          break;
        case "emptymessagetarget":
          this.emptyMessageTargetTemplate = item.template;
          break;
        case "emptyfiltermessagetarget":
          this.emptyFilterMessageTargetTemplate = item.template;
          break;
        case "moveupicon":
          this.moveUpIconTemplate = item.template;
          break;
        case "movetopicon":
          this.moveTopIconTemplate = item.template;
          break;
        case "movedownicon":
          this.moveDownIconTemplate = item.template;
          break;
        case "movebottomicon":
          this.moveBottomIconTemplate = item.template;
          break;
        case "movetotargeticon":
          this.moveToTargetIconTemplate = item.template;
          break;
        case "movealltotargeticon":
          this.moveAllToTargetIconTemplate = item.template;
          break;
        case "movetosourceicon":
          this.moveToSourceIconTemplate = item.template;
          break;
        case "movealltosourceicon":
          this.moveAllToSourceIconTemplate = item.template;
          break;
        case "targetfiltericon":
          this.targetFilterIconTemplate = item.template;
          break;
        case "sourcefiltericon":
          this.sourceFilterIconTemplate = item.template;
          break;
        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }
  ngAfterViewChecked() {
    if (this.movedUp || this.movedDown) {
      let listItems = DomHandler.find(this.reorderedListElement, "li.p-highlight");
      let listItem;
      if (this.movedUp)
        listItem = listItems[0];
      else
        listItem = listItems[listItems.length - 1];
      DomHandler.scrollInView(this.reorderedListElement, listItem);
      this.movedUp = false;
      this.movedDown = false;
      this.reorderedListElement = null;
    }
  }
  onItemClick(event, item, selectedItems, callback, itemId) {
    if (this.disabled) {
      return;
    }
    let index = this.findIndexInList(item, selectedItems);
    if (itemId)
      this.focusedOptionIndex = itemId;
    let selected = index != -1;
    let metaSelection = this.itemTouched ? false : this.metaKeySelection;
    if (metaSelection) {
      let metaKey = event.metaKey || event.ctrlKey || event.shiftKey;
      if (selected && metaKey) {
        selectedItems.splice(index, 1);
      } else {
        if (!metaKey) {
          selectedItems.length = 0;
        }
        selectedItems.push(item);
      }
    } else {
      if (selected)
        selectedItems.splice(index, 1);
      else
        selectedItems.push(item);
    }
    callback.emit({
      originalEvent: event,
      items: selectedItems
    });
    this.itemTouched = false;
  }
  onOptionMouseDown(index, listType) {
    this.focused[listType === this.SOURCE_LIST ? "sourceList" : "targetList"] = true;
    this.focusedOptionIndex = index;
  }
  onSourceItemDblClick() {
    if (this.disabled) {
      return;
    }
    this.moveRight();
  }
  onTargetItemDblClick() {
    if (this.disabled) {
      return;
    }
    this.moveLeft();
  }
  onFilter(event, listType) {
    let query = event.target.value;
    if (listType === this.SOURCE_LIST)
      this.filterSource(query);
    else if (listType === this.TARGET_LIST)
      this.filterTarget(query);
  }
  filterSource(value = "") {
    this.filterValueSource = value.trim().toLocaleLowerCase(this.filterLocale);
    this.filter(this.source, this.SOURCE_LIST);
  }
  filterTarget(value = "") {
    this.filterValueTarget = value.trim().toLocaleLowerCase(this.filterLocale);
    this.filter(this.target, this.TARGET_LIST);
  }
  filter(data, listType) {
    let searchFields = this.filterBy.split(",");
    if (listType === this.SOURCE_LIST) {
      this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
      this.onSourceFilter.emit({
        query: this.filterValueSource,
        value: this.visibleOptionsSource
      });
    } else if (listType === this.TARGET_LIST) {
      this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
      this.onTargetFilter.emit({
        query: this.filterValueTarget,
        value: this.visibleOptionsTarget
      });
    }
  }
  isItemVisible(item, listType) {
    if (listType == this.SOURCE_LIST)
      return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
    else
      return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
  }
  isEmpty(listType) {
    if (listType == this.SOURCE_LIST)
      return this.filterValueSource ? !this.visibleOptionsSource || this.visibleOptionsSource.length === 0 : !this.source || this.source.length === 0;
    else
      return this.filterValueTarget ? !this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0 : !this.target || this.target.length === 0;
  }
  isVisibleInList(data, item, filterValue) {
    if (filterValue && filterValue.trim().length) {
      for (let i = 0; i < data.length; i++) {
        if (item == data[i]) {
          return true;
        }
      }
    } else {
      return true;
    }
  }
  onItemTouchEnd() {
    if (this.disabled) {
      return;
    }
    this.itemTouched = true;
  }
  sortByIndexInList(items, list) {
    return items.sort((item1, item2) => ObjectUtils.findIndexInList(item1, list) - ObjectUtils.findIndexInList(item2, list));
  }
  moveUp(listElement, list, selectedItems, callback, listType) {
    if (selectedItems && selectedItems.length) {
      selectedItems = this.sortByIndexInList(selectedItems, list);
      for (let i = 0; i < selectedItems.length; i++) {
        let selectedItem = selectedItems[i];
        let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
        if (selectedItemIndex != 0) {
          let movedItem = list[selectedItemIndex];
          let temp = list[selectedItemIndex - 1];
          list[selectedItemIndex - 1] = movedItem;
          list[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (this.dragdrop && (this.filterValueSource && listType === this.SOURCE_LIST || this.filterValueTarget && listType === this.TARGET_LIST))
        this.filter(list, listType);
      this.movedUp = true;
      this.reorderedListElement = listElement;
      callback.emit({
        items: selectedItems
      });
    }
  }
  moveTop(listElement, list, selectedItems, callback, listType) {
    if (selectedItems && selectedItems.length) {
      selectedItems = this.sortByIndexInList(selectedItems, list);
      for (let i = 0; i < selectedItems.length; i++) {
        let selectedItem = selectedItems[i];
        let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
        if (selectedItemIndex != 0) {
          let movedItem = list.splice(selectedItemIndex, 1)[0];
          list.unshift(movedItem);
        } else {
          break;
        }
      }
      if (this.dragdrop && (this.filterValueSource && listType === this.SOURCE_LIST || this.filterValueTarget && listType === this.TARGET_LIST))
        this.filter(list, listType);
      listElement.scrollTop = 0;
      callback.emit({
        items: selectedItems
      });
    }
  }
  moveDown(listElement, list, selectedItems, callback, listType) {
    if (selectedItems && selectedItems.length) {
      selectedItems = this.sortByIndexInList(selectedItems, list);
      for (let i = selectedItems.length - 1; i >= 0; i--) {
        let selectedItem = selectedItems[i];
        let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
        if (selectedItemIndex != list.length - 1) {
          let movedItem = list[selectedItemIndex];
          let temp = list[selectedItemIndex + 1];
          list[selectedItemIndex + 1] = movedItem;
          list[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (this.dragdrop && (this.filterValueSource && listType === this.SOURCE_LIST || this.filterValueTarget && listType === this.TARGET_LIST))
        this.filter(list, listType);
      this.movedDown = true;
      this.reorderedListElement = listElement;
      callback.emit({
        items: selectedItems
      });
    }
  }
  moveBottom(listElement, list, selectedItems, callback, listType) {
    if (selectedItems && selectedItems.length) {
      selectedItems = this.sortByIndexInList(selectedItems, list);
      for (let i = selectedItems.length - 1; i >= 0; i--) {
        let selectedItem = selectedItems[i];
        let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
        if (selectedItemIndex != list.length - 1) {
          let movedItem = list.splice(selectedItemIndex, 1)[0];
          list.push(movedItem);
        } else {
          break;
        }
      }
      if (this.dragdrop && (this.filterValueSource && listType === this.SOURCE_LIST || this.filterValueTarget && listType === this.TARGET_LIST))
        this.filter(list, listType);
      listElement.scrollTop = listElement.scrollHeight;
      callback.emit({
        items: selectedItems
      });
    }
  }
  moveRight() {
    if (this.selectedItemsSource && this.selectedItemsSource.length) {
      for (let i = 0; i < this.selectedItemsSource.length; i++) {
        let selectedItem = this.selectedItemsSource[i];
        if (ObjectUtils.findIndexInList(selectedItem, this.target) == -1) {
          this.target?.push(this.source?.splice(ObjectUtils.findIndexInList(selectedItem, this.source), 1)[0]);
          if (this.visibleOptionsSource?.includes(selectedItem)) {
            this.visibleOptionsSource.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsSource), 1);
          }
        }
      }
      this.onMoveToTarget.emit({
        items: this.selectedItemsSource
      });
      if (this.keepSelection) {
        this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
      }
      this.selectedItemsSource = [];
      if (this.filterValueTarget) {
        this.filter(this.target, this.TARGET_LIST);
      }
    }
  }
  moveAllRight() {
    if (this.source) {
      let movedItems = [];
      for (let i = 0; i < this.source.length; i++) {
        if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
          let removedItem = this.source.splice(i, 1)[0];
          this.target?.push(removedItem);
          movedItems.push(removedItem);
          i--;
        }
      }
      this.onMoveAllToTarget.emit({
        items: movedItems
      });
      if (this.keepSelection) {
        this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
      }
      this.selectedItemsSource = [];
      if (this.filterValueTarget) {
        this.filter(this.target, this.TARGET_LIST);
      }
      this.visibleOptionsSource = [];
    }
  }
  moveLeft() {
    if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
      for (let i = 0; i < this.selectedItemsTarget.length; i++) {
        let selectedItem = this.selectedItemsTarget[i];
        if (ObjectUtils.findIndexInList(selectedItem, this.source) == -1) {
          this.source?.push(this.target?.splice(ObjectUtils.findIndexInList(selectedItem, this.target), 1)[0]);
          if (this.visibleOptionsTarget?.includes(selectedItem)) {
            this.visibleOptionsTarget.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
          }
        }
      }
      this.onMoveToSource.emit({
        items: this.selectedItemsTarget
      });
      if (this.keepSelection) {
        this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
      }
      this.selectedItemsTarget = [];
      if (this.filterValueSource) {
        this.filter(this.source, this.SOURCE_LIST);
      }
    }
  }
  moveAllLeft() {
    if (this.target) {
      let movedItems = [];
      for (let i = 0; i < this.target.length; i++) {
        if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
          let removedItem = this.target.splice(i, 1)[0];
          this.source?.push(removedItem);
          movedItems.push(removedItem);
          i--;
        }
      }
      this.onMoveAllToSource.emit({
        items: movedItems
      });
      if (this.keepSelection) {
        this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
      }
      this.selectedItemsTarget = [];
      if (this.filterValueSource) {
        this.filter(this.source, this.SOURCE_LIST);
      }
      this.visibleOptionsTarget = [];
    }
  }
  isSelected(item, selectedItems) {
    return this.findIndexInList(item, selectedItems) != -1;
  }
  itemClass(item, id, selectedItems) {
    return {
      "p-picklist-item": true,
      "p-highlight": this.isSelected(item, selectedItems),
      "p-focus": id === this.focusedOptionId
    };
  }
  findIndexInList(item, selectedItems) {
    return ObjectUtils.findIndexInList(item, selectedItems);
  }
  onDrop(event, listType) {
    let isTransfer = event.previousContainer !== event.container;
    let dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);
    if (listType === this.SOURCE_LIST) {
      if (isTransfer) {
        transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
        let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsTarget);
        if (selectedItemIndex != -1) {
          this.selectedItemsTarget.splice(selectedItemIndex, 1);
          if (this.keepSelection) {
            this.selectedItemsTarget.push(event.item.data);
          }
        }
        if (this.visibleOptionsTarget)
          this.visibleOptionsTarget.splice(event.previousIndex, 1);
        this.onMoveToSource.emit({
          items: [event.item.data]
        });
      } else {
        moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
        this.onSourceReorder.emit({
          items: [event.item.data]
        });
      }
      if (this.filterValueSource) {
        this.filter(this.source, this.SOURCE_LIST);
      }
    } else {
      if (isTransfer) {
        transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
        let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsSource);
        if (selectedItemIndex != -1) {
          this.selectedItemsSource.splice(selectedItemIndex, 1);
          if (this.keepSelection) {
            this.selectedItemsTarget.push(event.item.data);
          }
        }
        if (this.visibleOptionsSource)
          this.visibleOptionsSource.splice(event.previousIndex, 1);
        this.onMoveToTarget.emit({
          items: [event.item.data]
        });
      } else {
        moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
        this.onTargetReorder.emit({
          items: [event.item.data]
        });
      }
      if (this.filterValueTarget) {
        this.filter(this.target, this.TARGET_LIST);
      }
    }
  }
  onListFocus(event, listType) {
    let listElement = this.getListElement(listType);
    const selectedFirstItem = DomHandler.findSingle(listElement, "li.p-picklist-item.p-highlight") || DomHandler.findSingle(listElement, "li.p-picklist-item");
    const findIndex = ObjectUtils.findIndexInList(selectedFirstItem, listElement.children);
    this.focused[listType === this.SOURCE_LIST ? "sourceList" : "targetList"] = true;
    const index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : selectedFirstItem ? findIndex : -1;
    this.changeFocusedOptionIndex(index, listType);
    this.onFocus.emit(event);
  }
  onListBlur(event, listType) {
    this.focused[listType === this.SOURCE_LIST ? "sourceList" : "targetList"] = false;
    this.focusedOptionIndex = -1;
    this.focusedOption = null;
    this.onBlur.emit(event);
  }
  getListElement(listType) {
    return listType === this.SOURCE_LIST ? this.listViewSourceChild?.nativeElement : this.listViewTargetChild?.nativeElement;
  }
  getListItems(listType) {
    let listElemet = this.getListElement(listType);
    return DomHandler.find(listElemet, "li.p-picklist-item");
  }
  getLatestSelectedVisibleOptionIndex(visibleList, selectedItems) {
    const latestSelectedItem = [...selectedItems].reverse().find((item) => visibleList.includes(item));
    return latestSelectedItem !== void 0 ? visibleList.indexOf(latestSelectedItem) : -1;
  }
  getVisibleList(listType) {
    if (listType === this.SOURCE_LIST) {
      return this.visibleOptionsSource && this.visibleOptionsSource.length > 0 ? this.visibleOptionsSource : this.source && this.source.length > 0 ? this.source : null;
    }
    return this.visibleOptionsTarget && this.visibleOptionsTarget.length > 0 ? this.visibleOptionsTarget : this.target && this.target.length > 0 ? this.target : null;
  }
  setSelectionList(listType, selectedItems) {
    if (listType === this.SOURCE_LIST) {
      this.selectedItemsSource = selectedItems;
    } else {
      this.selectedItemsTarget = selectedItems;
    }
  }
  findNextOptionIndex(index, listType) {
    const items = this.getListItems(listType);
    const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  }
  findPrevOptionIndex(index, listType) {
    const items = this.getListItems(listType);
    const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  }
  onItemKeyDown(event, selectedItems, callback, listType) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event, selectedItems, callback, listType);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event, selectedItems, callback, listType);
        break;
      case "Home":
        this.onHomeKey(event, selectedItems, callback, listType);
        break;
      case "End":
        this.onEndKey(event, selectedItems, callback, listType);
        break;
      case "Enter":
        this.onEnterKey(event, selectedItems, callback);
        break;
      case "Space":
        this.onSpaceKey(event, selectedItems, callback, listType);
        break;
      case "KeyA":
        if (event.ctrlKey) {
          this.setSelectionList(listType, this.getVisibleList(listType));
          callback.emit({
            items: selectedItems
          });
          event.preventDefault();
        }
      default:
        break;
    }
  }
  getFocusedOption(index, listType) {
    if (index === -1)
      return null;
    if (listType === this.SOURCE_LIST) {
      return this.visibleOptionsSource && this.visibleOptionsSource.length ? this.visibleOptionsSource[index] : this.source && this.source.length ? this.source[index] : null;
    }
    return this.visibleOptionsTarget && this.visibleOptionsTarget.length ? this.visibleOptionsTarget[index] : this.target && this.target.length ? this.target[index] : null;
  }
  changeFocusedOptionIndex(index, listType) {
    const items = this.getListItems(listType);
    if (items?.length > 0) {
      let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
      this.focusedOptionIndex = items[order].getAttribute("id");
      this.focusedOption = this.getFocusedOption(order, listType);
      this.scrollInView(items[order].getAttribute("id"), listType);
    }
  }
  scrollInView(id, listType) {
    const element = DomHandler.findSingle(this.getListElement(listType), `li[id="${id}"]`);
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: "nearest",
        inline: "start"
      });
    }
  }
  onArrowDownKey(event, selectedItems, callback, listType) {
    const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex, listType);
    this.changeFocusedOptionIndex(optionIndex, listType);
    if (event.shiftKey) {
      this.onEnterKey(event, selectedItems, callback);
    }
    event.preventDefault();
  }
  onArrowUpKey(event, selectedItems, callback, listType) {
    const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex, listType);
    this.changeFocusedOptionIndex(optionIndex, listType);
    if (event.shiftKey) {
      this.onEnterKey(event, selectedItems, callback);
    }
    event.preventDefault();
  }
  onEnterKey(event, selectedItems, callback) {
    this.onItemClick(event, this.focusedOption, selectedItems, callback);
    event.preventDefault();
  }
  onSpaceKey(event, selectedItems, callback, listType) {
    event.preventDefault();
    if (event.shiftKey && selectedItems && selectedItems.length > 0) {
      let visibleList = this.getVisibleList(listType);
      let lastSelectedIndex = this.getLatestSelectedVisibleOptionIndex(visibleList, selectedItems);
      if (lastSelectedIndex !== -1) {
        let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
        selectedItems = [...visibleList.slice(Math.min(lastSelectedIndex, focusedIndex), Math.max(lastSelectedIndex, focusedIndex) + 1)];
        this.setSelectionList(listType, selectedItems);
        callback.emit({
          items: selectedItems
        });
        return;
      }
    }
    this.onEnterKey(event, selectedItems, callback);
  }
  onHomeKey(event, selectedItems, callback, listType) {
    if (event.ctrlKey && event.shiftKey) {
      let visibleList = this.getVisibleList(listType);
      let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
      selectedItems = [...visibleList.slice(0, focusedIndex + 1)];
      this.setSelectionList(listType, selectedItems);
      callback.emit({
        items: selectedItems
      });
    } else {
      this.changeFocusedOptionIndex(0, listType);
    }
    event.preventDefault();
  }
  onEndKey(event, selectedItems, callback, listType) {
    let visibleList = this.getVisibleList(listType);
    let lastIndex = visibleList && visibleList.length > 0 ? visibleList.length - 1 : null;
    if (lastIndex === null)
      return;
    if (event.ctrlKey && event.shiftKey) {
      let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
      selectedItems = [...visibleList.slice(focusedIndex, lastIndex)];
      this.setSelectionList(listType, selectedItems);
      callback.emit({
        items: selectedItems
      });
    } else {
      this.changeFocusedOptionIndex(lastIndex, listType);
    }
    event.preventDefault();
  }
  getDropIndexes(fromIndex, toIndex, droppedList, isTransfer, data) {
    let previousIndex, currentIndex;
    if (droppedList === this.SOURCE_LIST) {
      previousIndex = isTransfer ? this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex : this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex;
      currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(this.visibleOptionsSource, toIndex, this.source) : toIndex;
    } else {
      previousIndex = isTransfer ? this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex : this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex;
      currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(this.visibleOptionsTarget, toIndex, this.target) : toIndex;
    }
    return {
      previousIndex,
      currentIndex
    };
  }
  findFilteredCurrentIndex(visibleOptions, index, options) {
    if (visibleOptions.length === index) {
      let toIndex = ObjectUtils.findIndexInList(visibleOptions[index - 1], options);
      return toIndex + 1;
    } else {
      return ObjectUtils.findIndexInList(visibleOptions[index], options);
    }
  }
  resetSourceFilter() {
    this.visibleOptionsSource = null;
    this.filterValueSource = null;
    this.sourceFilterViewChild && (this.sourceFilterViewChild.nativeElement.value = "");
  }
  resetTargetFilter() {
    this.visibleOptionsTarget = null;
    this.filterValueTarget = null;
    this.targetFilterViewChild && (this.targetFilterViewChild.nativeElement.value = "");
  }
  resetFilter() {
    this.resetSourceFilter();
    this.resetTargetFilter();
  }
  onItemKeydown(event, item, selectedItems, callback) {
    let listItem = event.currentTarget;
    switch (event.which) {
      case 40:
        var nextItem = this.findNextItem(listItem);
        if (nextItem) {
          nextItem.focus();
        }
        event.preventDefault();
        break;
      case 38:
        var prevItem = this.findPrevItem(listItem);
        if (prevItem) {
          prevItem.focus();
        }
        event.preventDefault();
        break;
      case 13:
        this.onItemClick(event, item, selectedItems, callback);
        event.preventDefault();
        break;
    }
  }
  findNextItem(item) {
    let nextItem = item.nextElementSibling;
    if (nextItem)
      return !DomHandler.hasClass(nextItem, "p-picklist-item") || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
    else
      return null;
  }
  findPrevItem(item) {
    let prevItem = item.previousElementSibling;
    if (prevItem)
      return !DomHandler.hasClass(prevItem, "p-picklist-item") || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
    else
      return null;
  }
  initMedia() {
    if (isPlatformBrowser(this.platformId)) {
      this.media = this.window.matchMedia(`(max-width: ${this.breakpoint})`);
      this.viewChanged = this.media.matches;
      this.bindMediaChangeListener();
    }
  }
  destroyMedia() {
    this.unbindMediaChangeListener();
  }
  bindMediaChangeListener() {
    if (this.media && !this.mediaChangeListener) {
      this.mediaChangeListener = this.renderer.listen(this.media, "change", (event) => {
        this.viewChanged = event.matches;
        this.cd.markForCheck();
      });
    }
  }
  unbindMediaChangeListener() {
    if (this.mediaChangeListener) {
      this.mediaChangeListener();
      this.mediaChangeListener = null;
    }
  }
  createStyle() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.styleElement) {
        this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, "");
        this.styleElement = this.renderer.createElement("style");
        this.renderer.setAttribute(this.styleElement, "type", "text/css");
        this.renderer.appendChild(this.document.head, this.styleElement);
        let innerHTML = `
                @media screen and (max-width: ${this.breakpoint}) {
                    .p-picklist[${this.id}] {
                        flex-direction: column;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons {
                        padding: var(--content-padding);
                        flex-direction: row;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button {
                        margin-right: var(--inline-spacing);
                        margin-bottom: 0;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button:last-child {
                        margin-right: 0;
                    }
                }`;
        this.renderer.setProperty(this.styleElement, "innerHTML", innerHTML);
      }
    }
  }
  sourceMoveDisabled() {
    if (this.disabled || !this.selectedItemsSource.length) {
      return true;
    }
  }
  targetMoveDisabled() {
    if (this.disabled || !this.selectedItemsTarget.length) {
      return true;
    }
  }
  moveRightDisabled() {
    return this.disabled || ObjectUtils.isEmpty(this.selectedItemsSource);
  }
  moveLeftDisabled() {
    return this.disabled || ObjectUtils.isEmpty(this.selectedItemsTarget);
  }
  moveAllRightDisabled() {
    return this.disabled || ObjectUtils.isEmpty(this.source);
  }
  moveAllLeftDisabled() {
    return this.disabled || ObjectUtils.isEmpty(this.target);
  }
  destroyStyle() {
    if (this.styleElement) {
      this.renderer.removeChild(this.document.head, this.styleElement);
      this.styleElement = null;
      ``;
    }
  }
  ngOnDestroy() {
    this.destroyStyle();
    this.destroyMedia();
  }
  static ɵfac = function PickList_Factory(t) {
    return new (t || _PickList)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(PLATFORM_ID), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(FilterService), ɵɵdirectiveInject(PrimeNGConfig));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PickList,
    selectors: [["p-pickList"]],
    contentQueries: function PickList_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function PickList_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c02, 5);
        ɵɵviewQuery(_c12, 5);
        ɵɵviewQuery(_c2, 5);
        ɵɵviewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listViewSourceChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listViewTargetChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.sourceFilterViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.targetFilterViewChild = _t.first);
      }
    },
    hostAttrs: [1, "p-element"],
    inputs: {
      source: "source",
      target: "target",
      sourceHeader: "sourceHeader",
      tabindex: "tabindex",
      rightButtonAriaLabel: "rightButtonAriaLabel",
      leftButtonAriaLabel: "leftButtonAriaLabel",
      allRightButtonAriaLabel: "allRightButtonAriaLabel",
      allLeftButtonAriaLabel: "allLeftButtonAriaLabel",
      upButtonAriaLabel: "upButtonAriaLabel",
      downButtonAriaLabel: "downButtonAriaLabel",
      topButtonAriaLabel: "topButtonAriaLabel",
      bottomButtonAriaLabel: "bottomButtonAriaLabel",
      targetHeader: "targetHeader",
      responsive: "responsive",
      filterBy: "filterBy",
      filterLocale: "filterLocale",
      trackBy: "trackBy",
      sourceTrackBy: "sourceTrackBy",
      targetTrackBy: "targetTrackBy",
      showSourceFilter: "showSourceFilter",
      showTargetFilter: "showTargetFilter",
      metaKeySelection: "metaKeySelection",
      dragdrop: "dragdrop",
      style: "style",
      styleClass: "styleClass",
      sourceStyle: "sourceStyle",
      targetStyle: "targetStyle",
      showSourceControls: "showSourceControls",
      showTargetControls: "showTargetControls",
      sourceFilterPlaceholder: "sourceFilterPlaceholder",
      targetFilterPlaceholder: "targetFilterPlaceholder",
      disabled: "disabled",
      ariaSourceFilterLabel: "ariaSourceFilterLabel",
      ariaTargetFilterLabel: "ariaTargetFilterLabel",
      filterMatchMode: "filterMatchMode",
      stripedRows: "stripedRows",
      keepSelection: "keepSelection",
      breakpoint: "breakpoint"
    },
    outputs: {
      onMoveToSource: "onMoveToSource",
      onMoveAllToSource: "onMoveAllToSource",
      onMoveAllToTarget: "onMoveAllToTarget",
      onMoveToTarget: "onMoveToTarget",
      onSourceReorder: "onSourceReorder",
      onTargetReorder: "onTargetReorder",
      onSourceSelect: "onSourceSelect",
      onTargetSelect: "onTargetSelect",
      onSourceFilter: "onSourceFilter",
      onTargetFilter: "onTargetFilter",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    decls: 30,
    vars: 72,
    consts: [["cdkDropListGroup", "", 3, "ngStyle", "ngClass"], ["class", "p-picklist-buttons p-picklist-source-controls", 4, "ngIf"], [1, "p-picklist-list-wrapper", "p-picklist-source-wrapper"], ["class", "p-picklist-header", 4, "ngIf"], ["class", "p-picklist-filter-container", 4, "ngIf"], ["cdkDropList", "", "role", "listbox", "aria-multiselectable", "true", 1, "p-picklist-list", "p-picklist-source", 3, "id", "cdkDropListData", "ngStyle", "keydown", "focus", "blur", "cdkDropListDropped"], ["sourcelist", ""], ["ngFor", "", 3, "ngForOf", "ngForTrackBy"], [4, "ngIf"], [1, "p-picklist-buttons", "p-picklist-transfer-buttons"], ["type", "button", "pButton", "", "pRipple", "", 1, "p-button-icon-only", 3, "disabled", "click"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-picklist-list-wrapper", "p-picklist-target-wrapper"], ["cdkDropList", "", "role", "listbox", "aria-multiselectable", "true", 1, "p-picklist-list", "p-picklist-target", 3, "id", "cdkDropListData", "ngStyle", "keydown", "focus", "blur", "cdkDropListDropped"], ["targetlist", ""], ["class", "p-picklist-buttons p-picklist-target-controls", 4, "ngIf"], [1, "p-picklist-buttons", "p-picklist-source-controls"], [4, "ngTemplateOutlet"], [1, "p-picklist-header"], ["class", "p-picklist-title", 4, "ngIf"], [1, "p-picklist-title"], [1, "p-picklist-filter-container"], [4, "ngIf", "ngIfElse"], ["builtInSourceElement", ""], [1, "p-picklist-filter"], ["type", "text", "role", "textbox", 1, "p-picklist-filter-input", "p-inputtext", "p-component", 3, "disabled", "keyup"], ["sourceFilter", ""], [3, "styleClass", 4, "ngIf"], ["class", "p-picklist-filter-icon", 4, "ngIf"], [3, "styleClass"], [1, "p-picklist-filter-icon"], ["pRipple", "", "cdkDrag", "", "role", "option", 3, "ngClass", "id", "cdkDragData", "cdkDragDisabled", "click", "mousedown", "dblclick", "touchend", 4, "ngIf"], ["pRipple", "", "cdkDrag", "", "role", "option", 3, "ngClass", "id", "cdkDragData", "cdkDragDisabled", "click", "mousedown", "dblclick", "touchend"], ["class", "p-picklist-empty-message", 4, "ngIf"], [1, "p-picklist-empty-message"], ["builtInTargetElement", ""], ["targetFilter", ""], [1, "p-picklist-buttons", "p-picklist-target-controls"]],
    template: function PickList_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, PickList_div_1_Template, 13, 22, "div", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵtemplate(3, PickList_div_3_Template, 3, 4, "div", 3)(4, PickList_div_4_Template, 4, 3, "div", 4);
        ɵɵelementStart(5, "ul", 5, 6);
        ɵɵlistener("keydown", function PickList_Template_ul_keydown_5_listener($event) {
          return ctx.onItemKeyDown($event, ctx.selectedItemsSource, ctx.onSourceSelect, ctx.SOURCE_LIST);
        })("focus", function PickList_Template_ul_focus_5_listener($event) {
          return ctx.onListFocus($event, ctx.SOURCE_LIST);
        })("blur", function PickList_Template_ul_blur_5_listener($event) {
          return ctx.onListBlur($event, ctx.SOURCE_LIST);
        })("cdkDropListDropped", function PickList_Template_ul_cdkDropListDropped_5_listener($event) {
          return ctx.onDrop($event, ctx.SOURCE_LIST);
        });
        ɵɵtemplate(7, PickList_ng_template_7_Template, 1, 1, "ng-template", 7)(8, PickList_ng_container_8_Template, 3, 2, "ng-container", 8);
        ɵɵelementEnd()();
        ɵɵelementStart(9, "div", 9)(10, "button", 10);
        ɵɵlistener("click", function PickList_Template_button_click_10_listener() {
          return ctx.moveRight();
        });
        ɵɵtemplate(11, PickList_ng_container_11_Template, 3, 2, "ng-container", 8)(12, PickList_12_Template, 1, 0, null, 11);
        ɵɵelementEnd();
        ɵɵelementStart(13, "button", 10);
        ɵɵlistener("click", function PickList_Template_button_click_13_listener() {
          return ctx.moveAllRight();
        });
        ɵɵtemplate(14, PickList_ng_container_14_Template, 3, 2, "ng-container", 8)(15, PickList_15_Template, 1, 0, null, 11);
        ɵɵelementEnd();
        ɵɵelementStart(16, "button", 10);
        ɵɵlistener("click", function PickList_Template_button_click_16_listener() {
          return ctx.moveLeft();
        });
        ɵɵtemplate(17, PickList_ng_container_17_Template, 3, 2, "ng-container", 8)(18, PickList_18_Template, 1, 0, null, 11);
        ɵɵelementEnd();
        ɵɵelementStart(19, "button", 10);
        ɵɵlistener("click", function PickList_Template_button_click_19_listener() {
          return ctx.moveAllLeft();
        });
        ɵɵtemplate(20, PickList_ng_container_20_Template, 3, 2, "ng-container", 8)(21, PickList_21_Template, 1, 0, null, 11);
        ɵɵelementEnd()();
        ɵɵelementStart(22, "div", 12);
        ɵɵtemplate(23, PickList_div_23_Template, 3, 4, "div", 3)(24, PickList_div_24_Template, 4, 3, "div", 4);
        ɵɵelementStart(25, "ul", 13, 14);
        ɵɵlistener("keydown", function PickList_Template_ul_keydown_25_listener($event) {
          return ctx.onItemKeyDown($event, ctx.selectedItemsTarget, ctx.onTargetSelect, ctx.TARGET_LIST);
        })("focus", function PickList_Template_ul_focus_25_listener($event) {
          return ctx.onListFocus($event, ctx.TARGET_LIST);
        })("blur", function PickList_Template_ul_blur_25_listener($event) {
          return ctx.onListBlur($event, ctx.TARGET_LIST);
        })("cdkDropListDropped", function PickList_Template_ul_cdkDropListDropped_25_listener($event) {
          return ctx.onDrop($event, ctx.TARGET_LIST);
        });
        ɵɵtemplate(27, PickList_ng_template_27_Template, 1, 1, "ng-template", 7)(28, PickList_ng_container_28_Template, 3, 2, "ng-container", 8);
        ɵɵelementEnd()();
        ɵɵtemplate(29, PickList_div_29_Template, 13, 22, "div", 15);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngStyle", ctx.style)("ngClass", ɵɵpureFunction1(62, _c7, ctx.stripedRows));
        ɵɵattribute("data-pc-name", "picklist")("data-pc-section", "root");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showSourceControls);
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "sourceWrapper")("data-pc-group-section", "listWrapper");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.sourceHeader || ctx.sourceHeaderTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.filterBy && ctx.showSourceFilter !== false);
        ɵɵadvance();
        ɵɵproperty("id", ctx.idSource + "_list")("cdkDropListData", ctx.source)("ngStyle", ctx.sourceStyle);
        ɵɵattribute("aria-activedescendant", ctx.focused["sourceList"] ? ctx.focusedOptionId : void 0)("tabindex", ctx.source && ctx.source.length > 0 ? ctx.tabindex : -1)("data-pc-section", "sourceList")("data-pc-group-section", "list");
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.source)("ngForTrackBy", ctx.sourceTrackBy || ctx.trackBy);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isEmpty(ctx.SOURCE_LIST) && (ctx.emptyMessageSourceTemplate || ctx.emptyFilterMessageSourceTemplate));
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "buttons")("data-pc-group-section", "controls");
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveRightDisabled());
        ɵɵattribute("aria-label", ctx.moveToTargetAriaLabel)("data-pc-section", "moveToTargetButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveToTargetIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveToTargetIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(64, _c8, ctx.viewChanged));
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveAllRightDisabled());
        ɵɵattribute("aria-label", ctx.moveAllToTargetAriaLabel)("data-pc-section", "moveAllToTargetButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveAllToTargetIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveAllToTargetIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(66, _c8, ctx.viewChanged));
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveLeftDisabled());
        ɵɵattribute("aria-label", ctx.moveToSourceAriaLabel)("data-pc-section", "moveToSourceButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveToSourceIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveToSourceIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(68, _c8, ctx.viewChanged));
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveAllLeftDisabled());
        ɵɵattribute("aria-label", ctx.moveAllToSourceAriaLabel)("data-pc-section", "moveAllToSourceButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveAllToSourceIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveAllToSourceIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(70, _c8, ctx.viewChanged));
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "targetWrapper")("data-pc-group-section", "listwrapper");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.targetHeader || ctx.targetHeaderTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.filterBy && ctx.showTargetFilter !== false);
        ɵɵadvance();
        ɵɵproperty("id", ctx.idTarget + "_list")("cdkDropListData", ctx.target)("ngStyle", ctx.targetStyle);
        ɵɵattribute("aria-activedescendant", ctx.focused["targetList"] ? ctx.focusedOptionId : void 0)("tabindex", ctx.target && ctx.target.length > 0 ? ctx.tabindex : -1)("data-pc-section", "targetList")("data-pc-group-section", "list");
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.target)("ngForTrackBy", ctx.targetTrackBy || ctx.trackBy);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isEmpty(ctx.TARGET_LIST) && (ctx.emptyMessageTargetTemplate || ctx.emptyFilterMessageTargetTemplate));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showTargetControls);
      }
    },
    dependencies: () => [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, ButtonDirective, Ripple, CdkDropList, CdkDropListGroup, CdkDrag, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon],
    styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PickList, [{
    type: Component,
    args: [{
      selector: "p-pickList",
      template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <div class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate" [attr.data-pc-section]="'sourceHeader'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false" [attr.data-pc-section]="'sourceFilterContainer'">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'sourceFilter'">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                                [attr.data-pc-section]="'sourceFilterInput'"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'sourcefilterIcon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate" [attr.data-pc-section]="'sourcefilterIcon'">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul
                    #sourcelist
                    class="p-picklist-list p-picklist-source"
                    [id]="idSource + '_list'"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (focus)="onListFocus($event, SOURCE_LIST)"
                    (blur)="onListBlur($event, SOURCE_LIST)"
                    cdkDropList
                    [cdkDropListData]="source"
                    (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['sourceList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="source && source.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'sourceList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsSource), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idSource + '_' + i"
                            [ngClass]="itemClass(item, idSource + '_' + i, selectedItemsSource)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, onSourceSelect, idSource + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, SOURCE_LIST)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <div class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate" [attr.data-pc-section]="'targetHead'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false" [attr.data-pc-section]="'targetFilterContainer'">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'targetFilter'">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                                [attr.data-pc-section]="'targetFilterInput'"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'targetfiltericon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate" [attr.data-pc-section]="'targetfiltericon'">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #targetlist
                    class="p-picklist-list p-picklist-target"
                    [id]="idTarget + '_list'"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (focus)="onListFocus($event, TARGET_LIST)"
                    (blur)="onListBlur($event, TARGET_LIST)"
                    cdkDropList
                    [cdkDropListData]="target"
                    (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['targetList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="target && target.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'targetList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsTarget), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idTarget + '_' + i"
                            [ngClass]="itemClass(item, idTarget + '_' + i, selectedItemsTarget)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, onTargetSelect, idTarget + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, TARGET_LIST)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "p-element"
      },
      styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"]
    }]
  }], () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: FilterService
  }, {
    type: PrimeNGConfig
  }], {
    source: [{
      type: Input
    }],
    target: [{
      type: Input
    }],
    sourceHeader: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    rightButtonAriaLabel: [{
      type: Input
    }],
    leftButtonAriaLabel: [{
      type: Input
    }],
    allRightButtonAriaLabel: [{
      type: Input
    }],
    allLeftButtonAriaLabel: [{
      type: Input
    }],
    upButtonAriaLabel: [{
      type: Input
    }],
    downButtonAriaLabel: [{
      type: Input
    }],
    topButtonAriaLabel: [{
      type: Input
    }],
    bottomButtonAriaLabel: [{
      type: Input
    }],
    targetHeader: [{
      type: Input
    }],
    responsive: [{
      type: Input
    }],
    filterBy: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    sourceTrackBy: [{
      type: Input
    }],
    targetTrackBy: [{
      type: Input
    }],
    showSourceFilter: [{
      type: Input
    }],
    showTargetFilter: [{
      type: Input
    }],
    metaKeySelection: [{
      type: Input
    }],
    dragdrop: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    sourceStyle: [{
      type: Input
    }],
    targetStyle: [{
      type: Input
    }],
    showSourceControls: [{
      type: Input
    }],
    showTargetControls: [{
      type: Input
    }],
    sourceFilterPlaceholder: [{
      type: Input
    }],
    targetFilterPlaceholder: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    ariaSourceFilterLabel: [{
      type: Input
    }],
    ariaTargetFilterLabel: [{
      type: Input
    }],
    filterMatchMode: [{
      type: Input
    }],
    stripedRows: [{
      type: Input
    }],
    keepSelection: [{
      type: Input
    }],
    breakpoint: [{
      type: Input
    }],
    onMoveToSource: [{
      type: Output
    }],
    onMoveAllToSource: [{
      type: Output
    }],
    onMoveAllToTarget: [{
      type: Output
    }],
    onMoveToTarget: [{
      type: Output
    }],
    onSourceReorder: [{
      type: Output
    }],
    onTargetReorder: [{
      type: Output
    }],
    onSourceSelect: [{
      type: Output
    }],
    onTargetSelect: [{
      type: Output
    }],
    onSourceFilter: [{
      type: Output
    }],
    onTargetFilter: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    listViewSourceChild: [{
      type: ViewChild,
      args: ["sourcelist"]
    }],
    listViewTargetChild: [{
      type: ViewChild,
      args: ["targetlist"]
    }],
    sourceFilterViewChild: [{
      type: ViewChild,
      args: ["sourceFilter"]
    }],
    targetFilterViewChild: [{
      type: ViewChild,
      args: ["targetFilter"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var DragConfig = {
  zIndex: 1200
};
var PickListModule = class _PickListModule {
  static ɵfac = function PickListModule_Factory(t) {
    return new (t || _PickListModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _PickListModule,
    declarations: [PickList],
    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon],
    exports: [PickList, SharedModule, DragDropModule]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [{
      provide: CDK_DRAG_CONFIG,
      useValue: DragConfig
    }],
    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon, SharedModule, DragDropModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PickListModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon],
      exports: [PickList, SharedModule, DragDropModule],
      declarations: [PickList],
      providers: [{
        provide: CDK_DRAG_CONFIG,
        useValue: DragConfig
      }]
    }]
  }], null, null);
})();
export {
  PickList,
  PickListModule
};
//# sourceMappingURL=primeng_picklist.js.map
