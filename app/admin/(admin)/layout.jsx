import Adminnav from "@/components/Adminnav";



  
  export default function RootLayout({ children }) {
    return (
      <>
<Adminnav/>
      {children}
      </>
         
    );
  }