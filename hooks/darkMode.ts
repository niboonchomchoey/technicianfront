import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [dark, setDark] = useState<boolean>(false);

  const setDarkMode = (value: boolean) => {
    setDark(value);
    window.localStorage.setItem(
      "theme",
      JSON.stringify(value ? "dark" : "light")
    );
  };
  useEffect(() => {
    const enabledValue = window.localStorage.getItem("theme");
    const root = window.document.documentElement;
    if (enabledValue !== null) {
      const dark = JSON.parse(enabledValue) === "dark";
      if (dark) {
        setDark(true);
        root.classList.remove("light");
        root.classList.add("dark");
      } else {
        setDark(false);
        root.classList.remove("dark");
        root.classList.add("light");
      }
    } else {
      window.localStorage.setItem("theme", JSON.stringify("light"));
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [dark]);

  return [dark, setDarkMode] as const;
}
