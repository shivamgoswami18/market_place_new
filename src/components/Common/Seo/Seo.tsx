
import  { useEffect } from 'react';

interface SeoProps {
  title: string;
}

const Seo = ({ title }: SeoProps) => {

  useEffect(() => {
    document.title = `${title} | Vyzor`
  }, [])

  return (
    <>
    </>
  )
}

export default Seo