import psycopg2

with psycopg2.connect(dbname="zombie_tap_db", user="postgres", host="localhost", password="2008") as conn:
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE IF NOT EXISTS users(
                   id BIGINT, 
                   nickname VARCHAR, 
                   name VARCHAR,
                   zb_coins INTEGER,
                   friend_1 INTEGER,
                   friend_2 INTEGER,
    )""")

    #cursor.execute(f"ALTER TABLE users ADD COLUMN zb_coin INTEGER DEFAULT 0")