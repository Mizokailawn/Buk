import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <Card className="w-full aspect-square max-w-sm pt-0 pb-1 gap-2">
      <CardHeader className="p-0">
        <Skeleton className="h-35 w-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-1">
        <Skeleton className="h-2 w-1/2" />
        <Skeleton className="h-2 w-3/4" />
      </CardContent>
    </Card>
  )
}
