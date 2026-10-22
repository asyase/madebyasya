import { DepthProvider } from "@/lib/paths";
import Nav from "./Nav";
import Contact from "./Contact";
import Terminal from "./Terminal";
import Cursor from "./Cursor";

export default function Shell({ depth, children }: { depth: number; children: React.ReactNode }) {
  return (
    <DepthProvider depth={depth}>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      <Contact />
      <Terminal />
      <Cursor />
    </DepthProvider>
  );
}
