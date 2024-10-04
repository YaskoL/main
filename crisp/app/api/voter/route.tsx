"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function POST(req: Request) {
  // Get body request
  const body = await req.json();
  const { user, oeuvre } = body;

  // Call register function (see below)
  const result = await savevoter(user, oeuvre);

  if (result == false) {
    // Return an appropriate error message
    return NextResponse.json(
      { message: "Vous avez déjà voter" },
      { status: 403 }
    );
  }

  return NextResponse.json({ result });
}

async function savevoter(
  user: string,
  oeuvre: string
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

  const verifvote = `SELECT user FROM voter WHERE user = ?`;
  const voteVerif = await db.get(verifvote, user);
 
  if (voteVerif) {
    return false
  }

  // Insert the new user
  const sql = `INSERT INTO voter (user, oeuvre) VALUES (?, ?)`;
  const insert = await db.run(sql, user, oeuvre);

  return insert;
}