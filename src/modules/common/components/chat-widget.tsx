"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, Skeleton } from "@heroui/react"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "next-auth/react";

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatWidget() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const sessionId = useState(uuidv4())[0]; 
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola!, ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    setLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    invokeAgent(inputValue)
  }



  const invokeAgent = async (text: string) => {
    setLoading(true);
    try {
      // Verificar que el usuario esté autenticado
      if (!session) {
        setMessages(prevMessages => [...prevMessages, { 
          role: 'assistant', 
          content: 'Por favor, inicia sesión para usar el chat.', 
          timestamp: new Date(), 
          id: Date.now().toString() 
        }]);
        setLoading(false);
        return;
      }

      // Llamar a la API route del backend
      const response = await fetch('/api/bedrock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: text,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al invocar el agente');
      }

      // Agregar respuesta del bot al chat
      setMessages(prevMessages => [...prevMessages, { 
        role: 'assistant', 
        content: data.completion, 
        timestamp: new Date(), 
        id: Date.now().toString() 
      }]);
    } catch (error) {
      console.error('Error invoking agent:', error);
      setMessages(prevMessages => [...prevMessages, { 
        role: 'assistant', 
        content: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`, 
        timestamp: new Date(), 
        id: Date.now().toString() 
      }]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Chat de Ayuda</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {
                loading && (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] rounded-lg" />
                  </div>
                )
              }
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-card shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </>
  )
}
