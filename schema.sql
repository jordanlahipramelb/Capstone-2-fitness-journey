CREATE TABLE User (
    id             SERIAL PRIMARY KEY,
    username       TEXT UNIQUE NOT NULL,
    password       TEXT NOT NULL,
    first_name     TEXT NOT NULL,
    last_name      TEXT NOT NULL,
    city           TEXT NOT NULL,
    state          TEXT NOT NULL,
    email          TEXT NOT NULL
                    CHECK (position('@' IN email) > 1),
    fitness_type   TEXT,
    bio            TEXT NOT NULL,
    image_url      TEXT NOT NULL,
    votes          INTEGER DEFAULT 0,
-- One to Many Relationship; One badge can have many users
    badge_id       INTEGER NOT NULL
                    REFERENCES Badge ON DELETE CASCADE,
    is_admin       BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Badge (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    graphic     TEXT NOT NULL,
    --RULE      TEXT   -> parse this -> evaluate
        --- postsMoreThan,100
);

-- Unnecessary Complexity?
-- CREATE TABLE UsersBadges (
--     user_id     INTEGER NOT NULL 
--                 REFERENCES Users ON DELETE CASCADE,
--     badge_id    INTEGER NOT NULL 
--                 REFERENCES Badges ON DELETE CASCADE,
--     PRIMARY KEY (user_id, badge_id)
-- )

CREATE TABLE Category (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT NOT NULL,
)

CREATE TABLE Post (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL
                    REFERENCES User ON DELETE SET NULL,
-- One to Many Relationship; One category can have many posts
    category_id INTEGER NOT NULL
                    REFERENCES Category ON DELETE SET NULL,
    subject     TEXT,
    body        TEXT NOT NULL,
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME DEFAULT NULL,
    votes       INTEGER NOT NULL DEFAULT 0,
    --routine_id  optional fk to Routine
);

-- CREATE TABLE UserPostVote
--user_id
--post_id
--value (+1, -1)

-- CREATE TABLE UserCommentVote 
--user_id
--comment_id
--value (+1, -1)


CREATE TABLE Comment (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL 
                    REFERENCES User ON DELETE SET NULL,
    body        TEXT NOT NULL,
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME DEFAULT NULL,
    votes       INTEGER NOT NULL DEFAULT 0,
    -- One to Many Relationship; One post can have many comments
    post_id     INTEGER NOT NULL
                    REFERENCES Post ON DELETE CASCADE,
);





--Workouts, routines

-- List of equipment types
-- ex. barbell, dumbbell, bodyweight, cable machine, bands
CREATE TABLE Equipment (
    id      SERIAL PRIMARY KEY,
    type    TEXT NOT NULL,
)

CREATE TABLE Muscle (
    id      SERIAL PRIMARY KEY,
    name    TEXT NOT NULL,
)

--Exercise : e.g. Deadlift, How to do the exercise
-- List of exercises
CREATE TABLE Exercise (
    id                  SERIAL PRIMARY KEY,
    name                TEXT NOT NULL,
    equipment_id        INTEGER
                            REFERENCES Equipment ON DELETE SET NULL,
    primary_muscle_id   TEXT
                            REFERENCES Muscle ON DELETE SET NULL,
    secondary_muscle_id TEXT
                            REFERENCES Muscle ON DELETE SET NULL,
    description         TEXT NOT NULL,
    instructions        TEXT NOT NULL,
    image_url           TEXT,
)


--RoutineExercise :  5 x 5 Deadlifts on Tuesday with Rippetoe's Starting Strength
-- List of which exercises are a part of which routine
CREATE TABLE RoutineExercise (
    id          SERIAL PRIMARY KEY,
    routine_id  INTEGER NOT NULL
                    REFERENCES Routine ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL
                    REFERENCES Exercise ON DELETE CASCADE,
)


--Routine : Rippetoe's Starting Strength . Public vs. Private / User ID
-- List of Routines
CREATE TABLE Routine (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL
    user_id     INTEGER
                    REFERENCES User ON DELETE SET NULL,
    is_private  BOOLEAN NOT NULL DEFAULT FALSE,
)


--RoutineExerciseResult: On 11/16/2021 User ID 5 did 4 of 5 deadlifts at 400 lbs + RoutineExercise ID
-- List of log entries for each routine and exercise
CREATE TABLE Logs (
    id                  SERIAL PRIMARY KEY,
    date                DATETIME NOT NULL,
    user_id             INTEGER NOT NULL
                            REFERENCES User ON DELETE CASCADE,
    routine_exercise_id INTEGER
                            REFERENCES RoutineExercise ON DELETE SET NULL,
    set_number          INTEGER,
    reps                INTEGER,
    weight              INTEGER,
    
)
