type HighlightTextProps = {
  text: string
  highlight: string
}

export const HighlightText = ({ text, highlight }: HighlightTextProps) => {
  if (!highlight) return <>{text}</>

  const parts = text.split(new RegExp(`(${highlight})`, "gi"))

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={index} className="bg-yellow-200 text-black">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
