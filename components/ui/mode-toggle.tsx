'use client'
import { useTheme } from "next-themes"
import { Button } from "./button"
import { Moon, Sun } from "lucide-react"

const ModeToggle = () => {
    const { theme, setTheme } = useTheme()
    return (
        <Button variant={'ghost'} size={'icon'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Moon size={5} /> : <Sun size={5} />}
        </Button>
    )
}

export default ModeToggle