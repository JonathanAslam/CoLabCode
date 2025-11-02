# CoLabCode


## Git Commands
- When in the main (root) repository folder:
    - git branch <-- see what branches you have locally
    - git branch [name of branch] <-- creates a new branch
    - git checkout [name of branch] <-- switch to the branch. all future commits will go to this branch 
    - git add, commit <-- works the same as usual
        - if no branch on github with the [name of branch] <-- error will popup, use the given: git push --set-upstream origin [name of branch]


- When updating dependencies (after doing an npm install or git pull if main directory has new dependencies), run:
    - ```docker compose up --build --renew-anon-volumes```


<hr>

## Tech Stack
- ReactJS
- NodeJS
- PostgreSQL
- Docker
- Flyway


<hr>
