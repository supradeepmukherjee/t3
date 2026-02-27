'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

const QueryProvider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={useState(() => new QueryClient())[0]}>
        {children}
    </QueryClientProvider>
)

export default QueryProvider