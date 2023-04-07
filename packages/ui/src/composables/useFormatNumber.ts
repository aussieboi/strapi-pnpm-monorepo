export const useFormatNumber = (value: number, locale: string = "en"): string => {
  return Intl.NumberFormat(locale, {
    minimumIntegerDigits: 2,
  }).format(value)
}
