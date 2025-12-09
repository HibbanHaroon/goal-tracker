import toast from "react-hot-toast";

const toastOptions = {
  duration: 4000,
  style: {
    background: "#fff",
    color: "#000",
    border: "2px solid #000",
    borderRadius: "0px",
    padding: "14px 16px",
    fontWeight: "500",
  },
};

export const showSuccess = (message) => {
  toast.success(message, {
    ...toastOptions,
    style: {
      ...toastOptions.style,
      borderColor: "#28a745",
    },
    iconTheme: {
      primary: "#28a745",
      secondary: "#fff",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    ...toastOptions,
    style: {
      ...toastOptions.style,
      borderColor: "#dc3545",
    },
    iconTheme: {
      primary: "#dc3545",
      secondary: "#fff",
    },
  });
};

export const showInfo = (message) => {
  toast(message, toastOptions);
};
