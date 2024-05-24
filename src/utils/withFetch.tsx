/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { LoaderComponent } from "../components/LoaderComponent/LoaderComponent";
import { Genre } from "./types";

type FetchResult = boolean | { genres: Genre[] };

const withFetch = ({
  Component,
  useFetch,
}: {
  Component: React.FC<{ genres: Genre[] }>;
  useFetch: () => FetchResult;
}) => {
  return (props: any) => {
    const isFetchReady = useRef<FetchResult>(false);

    isFetchReady.current = useFetch() ?? false;

    if (!isFetchReady.current) {
      return <LoaderComponent />;
    }
    return <Component {...props} genres={isFetchReady.current} />;
  };
};

export default withFetch;
