import { fetcher } from "../fetch";

export const FilesService = {
  /**
   * 프리사인 url 호출용
   * 파일 저장::파일을 저장하기 위해 사전에 호출해야할 프리사인 api
   * 개발, 로컬 환경에서는 dev 버킷, 프로덕션 환경에서는 prod 버킷에 저장
   *
   * 썸네일
   * - Thumbnail/Temp/{yyyyMMDD}/{yyyyMMdd24HHmisss}.{확장자}
   *
   * 컨텐츠 파일
   * - Contents/Temp/{yyyyMMDD}/{yyyyMMdd24HHmisss}.{확장자}
   *
   * 첨부파일(multiple)
   * - AttachFiles/Temp/{yyyyMMDD}/Attach_{yyyyMMdd24HHmisss}.{확장자}
   *
   * 에디터 이미지 파일
   * - Images/Contents/{yyyyMMDD}/{파일명}
   */
  uploadFile: async (filepath: string) => {
    const data = { filepath };
    return await fetcher({
      url: `/files/upload`,
      method: "POST",
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      body: JSON.stringify(data),
    });
  },
  /**
   * s3 버킷으로 파일 업로드할 때 사용
   */
  uploadFileToS3: async (targetPath: string, formData: FormData) => {
    return await fetcher({
      baseUrl: targetPath,
      method: "POST",
      body: formData,
      useAuth: false,
      useBaseHeader: false,
    });
  },
  /**
   * 파일 다운로드(가져오기)::파일을 가져오기 위한 프리사인 api
   * 개발, 로컬 환경에서는 dev 버킷, 프로덕션 환경에서는 prod 버킷에 저장
   *
   * 썸네일
   * - Thumbnail/{작성일자}/{컨텐츠ID}.{확장자}
   *
   * 컨텐츠 파일
   * - Contents/{작성일자}/{컨텐츠ID}.{확장자}
   *
   * 첨부파일(multiple)
   * - AttachFiles/{작성일자}/Attach_{yyyyMMdd24HHmisss}.{확장자}
   *
   * 에디터 이미지 파일
   * - Images/Contents/{작성일자}/{파일명}
   */
  getFile: async (filepath: string) => {
    const data = {
      filepath,
    };
    return await fetcher({
      url: `/files/download`,
      method: "POST",
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      body: JSON.stringify(data),
    });
  },
  getFileFromS3: async (filepath: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL ?? "";
    
    return await fetcher({
      baseUrl,
      url: filepath,
    });
  },
};
