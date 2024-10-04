"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { Crisp } from "crisp-sdk-web";

export async function POST(req: Request) {
  // Get body request
  const body = await req.json();
  const { user, proposi } = body;

  // Call register function (see below)
  const result = await saveVisite(user, proposi);

  if (result == false) {
    // Return an appropriate error message
    return NextResponse.json(
      { message: "Vous avez déjà proposé une oeuvre" },
      { status: 403 }
    );
  }

  return NextResponse.json({ result });
}

async function saveVisite(
  user: string,
  proposi: string
) {
  let db = null;

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: process.env.DATABASE_NAME || "", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  const verifvote = `SELECT user FROM proposition WHERE user = ?`;
  const voteVerif = await db.get(verifvote, user);
 
  if (voteVerif) {
    return false
  }

  // Insert the new user
  const sql = `INSERT INTO proposition (user, proposition) VALUES (?, ?)`;
  const insert = await db.run(sql, user, proposi);

  return insert;
}