import { toast } from "sonner";

export const handleError = (err: unknown) => {
  const error = err as ErrorType;
  if (error?.status === "FETCH_ERROR") {
    toast.error("Please check your connection and try again...");
  } else {
    toast.error(
      error?.data?.message ??
        error?.message ??
        "An error occured. Please try again later"
    );
  }
};
