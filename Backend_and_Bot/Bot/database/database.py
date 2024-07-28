import psycopg2

with psycopg2.connect(dbname="ZombieTap_DB", user="postgres", host="localhost", password="2008") as conn:
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id BIGINT PRIMARY KEY, 
            name VARCHAR,
            nickname VARCHAR,
            zb_coins INT DEFAULT 0
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS friends (
            user_id BIGINT NOT NULL,
            friend_id BIGINT NOT NULL,
            PRIMARY KEY (user_id, friend_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)
        
    

    #cursor.execute(f"ALTER TABLE users ADD COLUMN zb_coin INTEGER DEFAULT 0")
    