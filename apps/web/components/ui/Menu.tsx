'use client'

import React from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu as MenuIcon, Home, PlusCircle, List, Tag, Wallet } from 'lucide-react'

const Menu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <MenuIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-none"
      >
        <SheetHeader className="p-4 border-b border-white/20">
          <SheetTitle className="text-lg font-semibold text-white">
            Finance Tracker
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <Home className="w-5 h-5" /> Home
          </Link>

          <Link
            href="/expenses"
            className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <PlusCircle className="w-5 h-5" /> Add Expense
          </Link>

          <Link
            href="/transactions"
            className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <List className="w-5 h-5" /> Transactions
          </Link>

          <Link
            href="/categories"
            className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <Tag className="w-5 h-5" /> Categories
          </Link>

          <Link
            href="/budget"
            className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <Wallet className="w-5 h-5" /> Budget
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default Menu
