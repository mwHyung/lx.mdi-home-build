"use client";

import "polyfill";
import { Document, Page, pdfjs } from "react-pdf";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { cn } from "@/utils/styles";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Menu,
  Minus,
  MoveHorizontal,
  MoveVertical,
  Plus,
  Printer,
  X,
} from "lucide-react";
import Button from "../Button";
import { FilesService } from "@/services/files";
import { useApiError } from "@/hooks";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import Image from "next/image";

import IconClose from "public/images/icon_close_pdf.svg";
import IconDown from "public/images/icon_down_pdf.svg";
import IconPrint from "public/images/icon_print_pdf.svg";
import IconFull from "public/images/icon_full_pdf.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url,
// ).toString();

interface Props {
  fileName?: string;
  pdfUrl: string;
  usePresigned?: boolean;
  onClose?: () => void;
}

const PDFViewer = ({ fileName, pdfUrl, usePresigned = true, onClose }: Props) => {
  const { onHandleError } = useApiError();

  const [url, setUrl] = useState<string | null>(null);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [showPageList, setShowPageList] = useState(false);
  const [scale, setScale] = useState(1);
  const [computedWidth, setComputedWidth] = useState(728); // Default fallback

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const pdfDocument = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const onLoadSuccess = useCallback(
    ({ numPages }: DocumentCallback) => {
      setTotalPages(numPages);
      if (pageRefs.current) {
        pageRefs.current = new Array(numPages).fill(null);
      }
    },
    [pdfDocument.current],
  );

  const setPageRef = (index: number) => (ref: HTMLDivElement | null) => {
    if (ref) {
      pageRefs.current[index] = ref;
      pageRefs.current[index].style.minHeight = "auto";
      pageRefs.current[index].style.backgroundColor = "#242628";
    }
  };

  const scrollToPage = useCallback(
    (targetPage: number) => {
      if (!pageRefs.current) return;
      pageRefs.current[targetPage - 1]?.scrollIntoView();
    },
    [scale],
  );

  const pageUP = useCallback(() => {
    if (!totalPages || currPage >= totalPages) return;
    const nextPage = currPage + 1;
    setCurrPage(nextPage);
    scrollToPage(nextPage);
  }, [currPage, totalPages, scrollToPage]);

  const pageDown = useCallback(() => {
    if (currPage <= 1) return;
    const prevPage = currPage - 1;
    setCurrPage(prevPage);
    scrollToPage(prevPage);
  }, [currPage, scrollToPage]);

  const handleClickPage = useCallback(
    (pageNum: number) => {
      setCurrPage(pageNum);
      scrollToPage(pageNum);
    },
    [scrollToPage],
  );

  const scaleUp = useCallback(() => {
    if (scale >= 3) return;

    if (scale >= 2) {
      const newScale = parseFloat((scale + 0.5).toFixed(2));
      setScale(newScale);
      return;
    }

    const newScale = parseFloat((scale + 0.2).toFixed(2));
    setScale(newScale);
  }, [scale]);

  const scaleDown = useCallback(() => {
    if (scale <= 0.2) return;

    if (scale > 2) {
      const newScale = parseFloat((scale - 0.5).toFixed(2));
      setScale(newScale);
      return;
    }

    const newScale = parseFloat((scale - 0.2).toFixed(2));
    setScale(newScale);
  }, [scale]);

  const fitToWidth = useCallback(() => {
    //
  }, []);

  const fitToHeight = useCallback(() => {
    //
  }, []);

  const loadPresignedUrl = async (pdfUrl: string) => {
    try {
      let res = await FilesService.getFile(pdfUrl);
      if (res.presign?.url) {
        setUrl(res.presign.url);
      }
    } catch (e: any) {
      console.error("pdf presign url 호출 실패...", e);
      onHandleError(e);
    }
  };

  useEffect(() => {
    if (usePresigned) {
      loadPresignedUrl(pdfUrl);
    } else {
      setUrl(pdfUrl);
    }
  }, [usePresigned, pdfUrl]);

  // Page 컴포넌트에 style 프로퍼티를 직접 줄 수 없어서 ref로 접근
  useEffect(() => {
    if (containerRef.current && controlRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const updatedPdfWidth = computedWidth * scale;

      // 컨테이너 너비보다 pdf 너비가 작으면 중앙 정렬
      if (updatedPdfWidth < containerWidth) {
        controlRef.current.style.transformOrigin = "top center";
        controlRef.current.style.margin = "0 auto";
      } else {
        // 컨테이너 너비보다 pdf 너비가 크면 좌측 정렬
        controlRef.current.style.transformOrigin = "top left";
        controlRef.current.style.margin = "0";
      }
      controlRef.current.style.width = `${computedWidth}px`;
      controlRef.current.style.transform = `scale(${scale})`;
    }
  }, [scale, computedWidth]);

  useEffect(() => {
    if (containerRef.current) {
      setComputedWidth(containerRef.current.clientWidth - 15 || 728);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let debounceTimer: NodeJS.Timeout | null = null;
    let lastDetectedPage: number | null = null;

    const getVisiblePage = () => {
      if (!containerRef.current) return;
      const pages = containerRef.current.querySelectorAll("[data-page-number]");
      let maxVisibleRatio = 0;
      let mostVisiblePage = null;

      pages.forEach(page => {
        const rect = page.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const ratio = visibleHeight / rect.height;

        if (ratio > maxVisibleRatio) {
          maxVisibleRatio = ratio;
          mostVisiblePage = parseInt(page.getAttribute("data-page-number")!, 10);
        }
      });

      if (mostVisiblePage !== null && mostVisiblePage !== lastDetectedPage) {
        lastDetectedPage = mostVisiblePage;
        setCurrPage(mostVisiblePage);
      }
    };

    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(getVisiblePage, 200);
    };

    containerRef.current?.addEventListener("scroll", handleScroll);
    getVisiblePage(); // 초기 렌더링 감지

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [totalPages]);

  useEffect(() => {
    const thumbnailContainerElem = thumbnailContainerRef.current;
    if (thumbnailContainerElem && showPageList) {
      const containerHeight = thumbnailContainerElem.clientHeight;
      const currPageElement = thumbnailContainerElem.querySelector(
        `[data-page-number="${currPage}"]`,
      ) as HTMLElement;

      if (!currPageElement) return;

      // 선택된 요소의 위치
      const elementTop = currPageElement.offsetTop;
      const elementHeight = currPageElement.clientHeight;

      // 중앙에 위치하도록 스크롤 계산
      const scrollPosition = elementTop - containerHeight / 2 + elementHeight / 2;

      // 스크롤 적용
      thumbnailContainerElem.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [showPageList, currPage]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-screen pointer-events-auto bg-[#242628] z-[99999]",
        {},
      )}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* toolbar */}
        <div className="shrink-0 w-full basis-10 flex items-center justify-between px-4 bg-[#323639] text-main-white">
          {/* 좌측 */}
          {/* <div className="flex-1 max-w-[33%] flex items-center gap-4">
            <Button
              variant="text"
              size="icon-sm"
              className="hover:bg-pub-gray-6"
              onClick={() => setShowPageList(prev => !prev)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <span className="text-sm truncate">{fileName}</span>
          </div> */}

          {/* 버튼 영역 */}
          {/* <div className="flex-[2] min-w-[33%] flex items-center justify-center gap-4">
            페이지 버튼
            <div className="flex items-center gap-2">
              <Button variant="text" size="icon" className="hover:bg-pub-gray-6" onClick={pageDown}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-sm shrink-0">
                {currPage} / {totalPages || "1"}
              </span>
              <Button variant="text" size="icon" className="hover:bg-pub-gray-6" onClick={pageUP}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            스케일 버튼
            <div className="flex items-center gap-2">
              <Button
                variant="text"
                size="icon"
                className="hover:bg-pub-gray-6"
                onClick={scaleDown}
              >
                <Minus className="w-5 h-5" />
              </Button>
              <span className="shrink-0 text-sm">{(scale * 100).toFixed(0)} %</span>
              <Button variant="text" size="icon" className="hover:bg-pub-gray-6" onClick={scaleUp}>
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            {/* <Button
              variant="text"
              size="icon"
              className="hover:bg-pub-gray-6"
              onClick={fitToHeight}
            >
              <MoveVertical className="w-4 h-4" />
            </Button>
            <Button
              variant="text"
              size="icon"
              className="hover:bg-pub-gray-6  "
              onClick={fitToWidth}
            >
              <MoveHorizontal className="w-4 h-4" />
            </Button>
          </div> */}

          {/* 옵션 버튼 */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {/* <Button
              variant="text"
              size="icon"
              className="hover:bg-pub-gray-6"
              onClick={() => window.print()}
            >
              <Printer className="w-5 h-5" />
            </Button> */}

            {/* 전체화면 */}
            <Button variant="text" size="icon" className="hover:bg-pub-gray-6" onClick={onClose}>
              <Image src={IconFull} alt="icon full" />
            </Button>
            {/* 프린트 */}
            <Button variant="text" size="icon" className="hover:bg-pub-gray-6" onClick={onClose}>
              <Image src={IconPrint} alt="icon print" />
            </Button>
            {/* 다운로드 */}
            <Button variant="text" size="icon" className="hover:bg-pub-gray-6" onClick={onClose}>
              <Image src={IconDown} alt="icon download" />
            </Button>
            {/* 닫기 */}
            <Button variant="text" size="icon" className="hover:bg-pub-gray-6" onClick={onClose}>
              <Image src={IconClose} alt="icon close" />
              {/* <X className="w-6 h-6" /> */}
            </Button>
          </div>
        </div>

        <div className="grow min-h-0 w-full mt-10">
          {url ? (
            <Document
              className={cn("w-full h-full flex", "", {})}
              file={url}
              loading={<div className="w-full h-full bg-[#242628]"></div>}
              error={
                <div className="w-full h-full bg-[#242628]">
                  문서를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
                </div>
              }
              // inputRef={pdfDocument}
              onLoadSuccess={onLoadSuccess}
            >
              <>
                {/* 좌측 리스트 */}
                <div
                  ref={thumbnailContainerRef}
                  className={cn(
                    "space-y-10 shrink-0 basis-[280px] flex flex-col items-center bg-red overflow-y-auto p-10 bg-pub-gray4 border border-t border-[#242628]",
                    {
                      hidden: !showPageList,
                    },
                  )}
                >
                  {totalPages &&
                    Array.from(new Array(totalPages), (_el, index) => (
                      <React.Fragment key={`container_${index + 1}`}>
                        <Page
                          className={cn(
                            "w-fit h-fit relative cursor-pointer opacity-80 hover:opacity-100",
                            {
                              "border-4 border-pub-redD opacity-100": currPage === index + 1,
                            },
                          )}
                          key={`front_page_${index + 1}`}
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          scale={1}
                          width={100}
                          onClick={() => handleClickPage(index + 1)}
                        >
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-main-white bg-main-gray px-1">
                            {index + 1}
                          </span>
                        </Page>
                      </React.Fragment>
                    ))}
                </div>

                {/* pdf */}
                <div
                  ref={containerRef}
                  className={cn("grow overflow-auto bg-[#242628]", {
                    "justify-center": scale < 1,
                  })}
                >
                  <div
                    className="space-y-4 h-0 grid justify-normal justify-items-center mx-auto"
                    ref={controlRef}
                  >
                    {totalPages &&
                      Array.from(new Array(totalPages), (_el, index) => (
                        <React.Fragment key={`container_${index + 1}`}>
                          <Page
                            className="!min-h-auto"
                            key={`front_page_${index + 1}`}
                            pageNumber={index + 1}
                            scale={1}
                            width={computedWidth}
                            inputRef={setPageRef(index)}
                            loading={
                              <div className="flex items-center justify-center w-full h-full bg-[#242628]">
                                <span className="w-8 h-8">
                                  <Loader2
                                    width={"100%"}
                                    height={"100%"}
                                    className="animate-spin text-main-white"
                                  />
                                </span>
                              </div>
                            }
                          />
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              </>
            </Document>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-[#242628]">
              <span className="w-8 h-8">
                <Loader2 width={"100%"} height={"100%"} className="animate-spin text-main-white" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
