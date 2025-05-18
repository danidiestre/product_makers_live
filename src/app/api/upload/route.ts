import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";

import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);

    console.log("Sesión completa:", JSON.stringify(session, null, 2));

    if (!session || !session.user || !session.user.id) {
      console.log("No autenticado o falta ID de usuario");
      return NextResponse.json(
        { error: "No autenticado o falta ID de usuario" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó archivo" },
        { status: 400 }
      );
    }

    // Añadir el directorio productmakers al path del archivo
    const fileName = `productmakers/${
      session.user.id
    }/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    // Subir a Vercel Blob con el path modificado
    const blob = await put(fileName, file, {
      access: "public",
    });

    // Devuelve la URL del blob
    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Error desconocido al subir archivo",
      },
      { status: 500 }
    );
  }
}
