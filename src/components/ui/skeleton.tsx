import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded-md',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
