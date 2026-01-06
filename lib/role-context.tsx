"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { UserRole } from "./roles"

interface RoleContextType {
  currentRole: UserRole
  setRole: (role: UserRole) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>("staff_doctor")

  // ローカルストレージからロールを読み込む
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole")
    if (savedRole) {
      setCurrentRole(savedRole as UserRole)
    }
  }, [])

  const setRole = (role: UserRole) => {
    setCurrentRole(role)
    localStorage.setItem("userRole", role)
  }

  return <RoleContext.Provider value={{ currentRole, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
