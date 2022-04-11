import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious(theme: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = theme;
  });
  return ref.current;
}

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
function useStorageTheme(
  key: any
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const userPreference =
    !!window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "1"
      : "0";

  const [theme, setTheme] = useState<string>(
    // use stored theme; fallback to user preference
    localStorage.getItem(key) || userPreference
  );

  // update stored theme
  useEffect(() => {
    localStorage.setItem(key, theme);
  }, [theme, key]);

  return [theme, setTheme];
}

// create context
export const ThemeContext = React.createContext<any>({});
interface IThemeProvider {
  children: React.ReactChild;
}
// create context provider
export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [theme, setTheme] = useStorageTheme("theme");

  // update root element class on theme change
  const oldTheme = usePrevious(theme);
  useLayoutEffect(() => {
    if (oldTheme) {
      document.documentElement.classList.remove(oldTheme);
    }
    document.documentElement.classList.add(theme);
  }, [theme, oldTheme]);

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
