export declare global {
  interface Window {
    Kakao: any & {
      API: {
        request: () => void;
      }
    };
    kakaoAsyncInit: () => void;
  }
}
