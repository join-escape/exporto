import ToolsNavbar from "@/components/layout/tools-navbar";

export default function ToolsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { toolName: string };
}) {
  return (
    <>
      <ToolsNavbar currentToolId={params.toolName} />
      <div className="flex-1">{children}</div>
    </>
  );
}
