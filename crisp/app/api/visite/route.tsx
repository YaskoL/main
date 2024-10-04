"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function POST(req: Request) {
  // Get body request
  const body = await req.json();
  const { user, oeuvre } = body;

  // Call register function (see below)
  const result = await saveVisite(user, oeuvre);


  return NextResponse.json({ result });
}

async function saveVisite(
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

  // Insert the new user
  const sql = `INSERT INTO visite (user, oeuvre) VALUES (?, ?)`;
  const insert = await db.run(sql, user, oeuvre);

  return insert;
}