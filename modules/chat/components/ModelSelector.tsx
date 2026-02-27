import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Model } from "@/model.types"
import { ChevronDown, Search, Sparkles } from "lucide-react"
import { Dispatch, useState } from "react"

const ModelSelector = ({ className, id, models, onModelSelect }: {
  models: Model[]
  id: string,
  onModelSelect: Dispatch<string>
  className: string
}) => {
  const [open, setOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedForDetails, setSelectedForDetails] = useState<Model | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const model = models?.find(m => m.id === id)
  const formatContextLength = (l: number) => {
    if (l >= 1000000) return (length / 1000000).toFixed(1) + 'M'
    if (l >= 1000) return (length / 1000).toFixed(1) + 'K'
    return l.toString()
  }
  const isFreeModel = ({ pricing }: Model) => pricing.prompt === '0' || pricing.completion === '0' || pricing.request === '0'
  const openModelDetails = (m: Model, e: Event) => {
    e.stopPropagation()
    setSelectedForDetails(m)
    setDetailsOpen(true)
  }
  const filteredModels = models?.filter(m => {
    const query = searchQuery.toLowerCase()
    return (
      m.name.toLowerCase().includes(query) ||
      m.description.toLowerCase().includes(query) ||
      m.id.toLowerCase().includes(query) ||
      m.architecture.modality.toLowerCase().includes(query)
    )
  })
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={'ghost'} role="combobox" aria-expanded={open} className={cn('h-8 justify-between gap-2 px-2 text-xs hover:bg-accent', className)}>
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate font-medium">
                {model?.name || 'Select Model'}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-3xl p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search models..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="h-9 pl-9" />
            </div>
          </div>
          <ScrollArea className="h-100">
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                Available Models ({filteredModels?.length})
              </div>
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ModelSelector