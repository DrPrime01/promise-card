type EmptyUIPropTypes = {
  icon?: React.ReactNode;
  title: string;
  desc?: string;
  actions?: React.ReactNode;
};

export default function EmptyUI({
  icon,
  title,
  desc,
  actions,
}: EmptyUIPropTypes) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 min-w-0 p-6 text-center text-balance md:p-12">
      <div className="max-w-sm flex flex-col items-center gap-2 text-center">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6 bg-muted text-foreground">
          {icon}
        </div>
        <h4 className="text-lg font-medium tracking-tight">{title}</h4>
        <p className="text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4">
          {desc}
        </p>
      </div>
      <div className="flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance">
        {actions}
      </div>
    </div>
  );
}
