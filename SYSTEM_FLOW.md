# KATHA ART SYSTEM
# COMPLETE SYSTEM FLOW

> **Repository verification note:** The repository implements an Ionic/Angular personal productivity application displayed as **TIMESYNC**, not a Laravel art system. No nested `katha-art-system/` application is present. This flow documents only the routes, screens, actions, and local-storage behavior that can be traced in the checked-out source. The intended relationship to “Katha Art System” is **Not verified from the repository.**

## 1. Overall User Flow

1. **Start:** The person opens the web or mobile application.
2. The empty route redirects to **Home**. There is no login or role check.
3. Home loads tasks and Pomodoro sessions from the current browser/device local storage. If no task data has ever been saved, two built-in sample tasks are shown in memory.
4. The person can review the dashboard, change the temporary Home feeling selection, act on today's tasks, or open Tasks, Pomodoro, or Analytics.
5. Task changes are saved to local storage and immediately update subscribed screens.
6. Analytics reads task, Pomodoro-session, and mood data from local storage and calculates the selected range.
7. Mood actions on Analytics add or clear local mood entries.
8. The timer runs in memory and is shared between its normal and fullscreen views. It is not connected to Pomodoro-session storage.
9. The person continues to another module or closes the application. There is no logout flow.

## 2. Overall System Flowchart

```mermaid
flowchart TD
    A([START]) --> B[Open application]
    B --> C[Redirect empty path to Home]
    C --> D[Load local task and Pomodoro-session data]
    D --> E[Display Home overview]
    E --> F{Choose an action}

    F -->|Select feeling| G[Highlight feeling on Home only]
    G --> E

    F -->|Open or complete today's task| H[Task flow]
    F -->|Add task or open Tasks| H
    F -->|Open Pomodoro| I[Timer flow]
    F -->|Open Stats or Analytics| J[Analytics and mood flow]

    H --> K[(Read or update tasks in local storage)]
    K --> L[Refresh task-based screens]
    L --> M{Continue?}

    I --> N[Run shared in-memory timer]
    N --> O[No session record is saved]
    O --> M

    J --> P[(Read tasks, sessions, and moods from local storage)]
    P --> Q[Calculate and display selected statistics]
    Q --> R{Mood action?}
    R -->|Add mood or clear all| S[(Update mood_entries in local storage)]
    R -->|No| M
    S --> Q

    M -->|Yes| F
    M -->|Close browser or app| T([END])
```

## 3. Entry and Navigation Flow

```mermaid
flowchart TD
    A[Application opened] --> B{Requested route}
    B -->|Empty path| C[Redirect to /home]
    B -->|Known route| D[Load requested page]
    C --> E[Home]
    D --> E
    D --> F[Tasks]
    D --> G[Add Task]
    D --> H[Task Details by ID]
    D --> I[Pomodoro]
    D --> J[Pomodoro Fullscreen]
    D --> K[Analytics]

    E -->|Add task| G
    E -->|Select task| H
    E -->|Pomodoro shortcut| I
    E -->|All Tasks| F
    E -->|Stats or View More| K

    F -->|Add task| G
    F -->|Select task| H
    H -->|Edit| G
    H -->|Start Pomodoro| I
    I -->|Fullscreen| J
    J -->|Close| I

    F -. Bottom navigation .-> E
    F -. Bottom navigation .-> I
    F -. Bottom navigation .-> K
    I -. Bottom navigation .-> E
    I -. Bottom navigation .-> F
    I -. Bottom navigation .-> K
    K -. Bottom navigation .-> E
    K -. Bottom navigation .-> F
    K -. Bottom navigation .-> I
```

### Route behavior and exceptions

- Task Details requires an ID. If the ID is missing or is not found in the currently loaded tasks, the application navigates to Tasks.
- `/tabs/tasks` and `/tabs/pomodoro` are compatibility paths that redirect to Tasks and Pomodoro.
- No catch-all “page not found” route is implemented.
- No route is protected by authentication or authorization.
- The Profile component is not registered as a route and is not part of the reachable navigation flow.

## 4. Task Management Flow

### 4.1 Initial task loading

```mermaid
flowchart TD
    A[Task service is created] --> B{Does local storage contain tasks?}
    B -->|Yes| C[Parse stored task list]
    C --> D{Parsing succeeds?}
    D -->|Yes| E[Convert stored creation dates to dates]
    D -->|No| F[Write error to console and keep built-in sample tasks]
    B -->|No| F
    E --> G[Publish task list to screens]
    F --> G
```

Two sample tasks are the initial in-memory list when no usable saved task list exists: **Complete Project Proposal** and **Study for exam**. They are not written to local storage until a task-changing operation saves the list.

### 4.2 Add task flow

```mermaid
flowchart TD
    A[Select Add task] --> B[Open Add Task form]
    B --> C[Show defaults: Work, Medium, 20 minutes]
    C --> D[Enter title and optional information]
    D --> E{Title has a visible character?}
    E -->|No| F[Keep Save Task disabled or stop submission]
    F --> D
    E -->|Yes| G[Trim title and description]
    G --> H[Create task ID from current timestamp]
    H --> I[Set incomplete status and current creation date]
    I --> J[Append task to task list]
    J --> K[(Save complete task list to local storage key tasks)]
    K --> L[Return to Tasks]
    L --> M[Display updated list]
```

No due date or due time is collected. Estimated time uses 20 when its submitted value is absent or otherwise evaluates as zero.

### 4.3 View, filter, and complete task flow

```mermaid
flowchart TD
    A[Open Tasks] --> B[Read current task list]
    B --> C{Selected category}
    C -->|Other| D[Display every task]
    C -->|Work, Study, Personal, or Health| E[Display matching tasks]
    D --> F{User action}
    E --> F
    F -->|Select completion circle| G[Invert completed value]
    G --> H[(Save task list locally)]
    H --> B
    F -->|Select task card| I[Open Task Details with task ID]
    I --> J{Task ID found?}
    J -->|No| A
    J -->|Yes| K[Display task information]
    K -->|Mark as Complete or Completed| G
```

The Tasks page's **Other** selection is implemented as “show all”; it does not filter to only Other-category tasks.

### 4.4 Edit task flow

```mermaid
flowchart TD
    A[Open Task Details] --> B[Select edit icon]
    B --> C[Pass current task through navigation state]
    C --> D[Open Add Task form in edit mode]
    D --> E[Populate existing values]
    E --> F[Change fields]
    F --> G{Title has a visible character?}
    G -->|No| H[Do not submit]
    H --> F
    G -->|Yes| I[Merge changed values into matching task]
    I --> J[(Save complete task list locally)]
    J --> K[Return to Tasks]
```

### 4.5 Delete task flow

```mermaid
flowchart TD
    A{Deletion started from} -->|Task Details| B[Select trash icon]
    B --> C[Remove task immediately]
    C --> D[(Save remaining tasks locally)]
    D --> E[Open Tasks]

    A -->|Task form| F[Select trash icon]
    F --> G[Show Delete Task confirmation]
    G -->|Cancel| H[Keep task and form open]
    G -->|Delete while editing| I[Remove matching task]
    I --> D
    G -->|Delete on new form| J[No task is removed]
    J --> E
```

## 5. Home Dashboard Flow

```mermaid
flowchart TD
    A[Open Home] --> B[Subscribe to task changes]
    A --> C[Subscribe to Pomodoro-session changes]
    B --> D[Find tasks whose creation date is today]
    B --> E[Count all completed tasks and all tasks]
    C --> F[Sum today's saved session focus minutes]
    D --> G[Render today's task list]
    E --> H[Render completion progress and productivity]
    F --> I[Render focus progress toward 120 minutes]
    G --> J{Home action}
    H --> J
    I --> J
    J -->|Select task checkbox| K[Toggle and save completion]
    J -->|Select task| L[Open Task Details]
    J -->|Select feeling| M[Change current on-screen selection only]
    J -->|Select shortcut| N[Open selected module]
    K --> B
```

Home productivity is completed tasks divided by all tasks, capped between 0% and 100%. Its “Weekly Overview” uses these current totals; it does not calculate a separate week range.

## 6. Pomodoro Timer Flow

### 6.1 Normal timer

```mermaid
flowchart TD
    A[Open Pomodoro] --> B[Display shared timer state]
    B --> C{Action}
    C -->|Start| D[Run one-second interval]
    D --> E{Mode}
    E -->|Count down| F[Subtract one second, not below zero]
    F --> G{Reached zero?}
    G -->|No| D
    G -->|Yes| H[Pause timer]
    E -->|Count up| I[Add one second]
    I --> D
    C -->|Pause| H
    C -->|Timer Mode| J[Open mode sheet]
    J -->|Cancel| B
    J -->|Confirm| K[Set chosen mode and reset]
    K --> B
    C -->|Fullscreen| L[Open Fullscreen using same timer service]
    C -->|White Noise| M[Open choices]
    M -->|Confirm| N[Close sheet without audio playback]
    N --> B
```

### 6.2 Fullscreen timer

```mermaid
flowchart TD
    A[Open Fullscreen] --> B[Display shared timer state]
    B --> C{Action}
    C -->|Play or pause| D[Toggle shared timer]
    D --> B
    C -->|Stop| E[Pause and reset according to current mode]
    E --> B
    C -->|Mute icon| F[Toggle visual muted state only]
    F --> B
    C -->|Timer icon| G[Choose and apply mode]
    G --> B
    C -->|Settings icon| H[Choose White Noise]
    H --> I[Close sheet; no audio playback]
    I --> B
    C -->|Close icon| J[Return to Pomodoro]
```

### 6.3 Focus-record limitation

The timer service changes elapsed seconds only. Neither timer page calls the Pomodoro service's session-creation operation when time reaches zero or the user stops. Therefore:

```text
Timer runs or ends
→ No Pomodoro session is created
→ No pomodoro_sessions local-storage update occurs
→ Home and Analytics focus totals do not increase
```

## 7. Analytics Flow

```mermaid
flowchart TD
    A[Open Analytics] --> B[Default range is Week]
    B --> C[Read tasks and saved Pomodoro sessions]
    C --> D{Selected range}
    D -->|Week| E[Build seven daily buckets ending today]
    D -->|Month| F[Build seven four-day buckets for roughly 28 days]
    D -->|Year| G[Build seven monthly buckets ending this month]
    E --> H[Sum focus minutes and completed tasks]
    F --> H
    G --> H
    H --> I[Calculate productivity against range target]
    I --> J[Calculate all-task category percentages]
    J --> K[Display stat cards, charts, and categories]
    K --> L{Change range?}
    L -->|Yes| D
    L -->|No| M[Remain on Analytics]
```

### Calculation rules

- **Week:** today and the preceding six days.
- **Month:** sessions/tasks no more than 28 calculated days old, put into seven buckets by age. Labels are W1 through W7.
- **Year:** the current month and preceding six months.
- **Focus Minutes:** sum of `focusTime` in saved sessions in the selected buckets.
- **Tasks Completed:** number of completed tasks whose creation date is in the selected buckets.
- **Productivity:** completed-task total divided by 10 (Week), 40 (Month), or 480 (Year), multiplied by 100 and capped at 100%.
- **Task Categories:** each displayed category count divided by all tasks. Displayed categories are Work, Study, Personal, and Health; Other contributes to the denominator but has no displayed row.

There is no export or downloadable report flow.

## 8. Mood Tracking Flow

```mermaid
flowchart TD
    A[Analytics loads] --> B[Read mood_entries from local storage]
    B --> C{Stored value can be parsed?}
    C -->|Yes| D[Convert stored dates and show up to seven newest entries]
    C -->|No or absent| E[Show No mood entries yet]
    D --> F{Mood action}
    E --> F
    F -->|Bad, Okay, Good, or Great| G[Create timestamp ID and current date]
    G --> H[(Append entry and save mood_entries locally)]
    H --> D
    F -->|Hide list| I[Hide list without deleting data]
    I -->|Show list| D
    F -->|Clear| J[Remove every mood entry without confirmation]
    J --> K[(Save empty mood list locally)]
    K --> E
```

The feeling buttons on Home are a separate visual control and never enter this mood flow.

## 9. Data Flow Summary

| User-visible data | Source | User actions that update it | Persistence |
|---|---|---|---|
| Tasks | Task service | Add, edit, completion toggle, delete | Local storage key `tasks` |
| Analytics moods | Mood service | Select mood, Clear all | Local storage key `mood_entries` |
| Timer value and mode | Timer service | Start, pause, stop/reset, change mode | Memory only; shared between normal and Fullscreen while the service exists |
| White Noise choice | Pomodoro page instance | Select an option and confirm | Page memory only; no sound implementation |
| Home feeling | Home page instance | Select Bad, Okay, Good, or Great | Page memory only |
| Pomodoro sessions | Pomodoro service | No connected user-facing action | Reads/writes local storage key `pomodoro_sessions`, but the UI does not create records |

## 10. Authentication, Roles, Profile, Notifications, Uploads, and Reports

These flows were checked because they are commonly present in the requested system, but they are not implemented here:

- **Authentication:** no login, registration, password, or session flow.
- **Roles:** no roles, permissions, guards, or role redirects.
- **Profile:** a static component exists but has no route and no working account actions.
- **Logout:** no authenticated session and no logout action.
- **Notifications:** no notification workflow. The word “Notifications” appears only in the unreachable static Profile design.
- **Uploads:** no image or file selection/upload workflow.
- **Search/sort/pagination:** none; only task category filtering is implemented.
- **Report export:** none; Analytics is on-screen only.
- **Server/database operations:** none found. User data flows to browser/device local storage rather than a database.

Any intended Katha art-specific process, user role, artwork workflow, database, or Laravel behavior is **Not verified from the repository.**
