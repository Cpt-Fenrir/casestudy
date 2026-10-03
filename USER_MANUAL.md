# KATHA ART SYSTEM
# USER MANUAL

> **Repository verification note:** The checked-out repository does not contain a Laravel application or a nested `katha-art-system/` directory. It contains an Ionic/Angular application whose visible product name is **TIMESYNC** and whose Android application name is `pomodoro-focus`. No art-management features were found. To avoid inventing behavior, this manual documents only the user-facing behavior implemented in this repository. The name “Katha Art System” is retained in the heading only because it was requested. Any intended relationship between Katha Art System and TIMESYNC is **Not verified from the repository.**

## 1. Introduction

The application implemented in this repository is a personal task and focus-time application. It lets a person:

- see a home overview;
- create, view, edit, complete, and delete tasks;
- filter tasks by category;
- use a count-down or count-up focus timer;
- view task and focus statistics; and
- record a simple mood from the Analytics page.

The application stores tasks, Pomodoro session records, and Analytics mood entries in the current browser or device's local storage. It does not contain a server database, user accounts, or a connection to an art-management service.

### Important verified limitations

- There is no login, registration, authentication, or role-based access.
- There is no implemented upload, notification, report export, search, sort, or pagination function.
- Although a Pomodoro-session storage service exists, the visible timer does not save a completed session to it. Focus totals therefore cannot be increased through the implemented timer screens.
- White Noise choices can be selected, but no sound is played.
- The Home page feeling buttons only change the current on-screen selection. They do not create an Analytics mood entry. Use **Mood Tracking** on the Analytics page to save a mood.
- A Profile design exists in the source, but no route or working controls expose it. Its displayed identity and settings are static, and its **LOG OUT** button has no action. It is therefore not an available system feature.
- Several templates refer to icon files that are absent from the checked-out repository. Some images may appear missing if this checkout is run.

## 2. Getting Started

1. Open the deployed application in a web browser, or open the installed mobile application.
2. The application opens directly on **Home**. There is no landing, login, or account-selection page.
3. Use the page buttons or the bottom navigation to open **Home**, **Tasks**, **Pomodoro**, or **Analytics**.

The deployed web address and distribution method are **Not verified from the repository.**

[SCREENSHOT 01 — Home Page]

**How to capture**

1. Role to use: no role or account is required.
2. Open the application and remain on **Home**.
3. Capture the complete page, including the greeting, feeling choices, progress, today's tasks, quick links, weekly overview, and focus prompt. If the page is longer than the screen, use a full-page capture.

**The screenshot should show:** the current date, **How are you feeling today?**, **Today's Progress**, task summary, quick links, and **Start Pomodoro Session**.

**Figure Caption:** Figure 1. Home page of the application in the checked-out Katha Art System repository.

## 3. User Roles

### Local Application User

**Purpose:** This is not a named role in the code. It describes any person who can open the application on the current browser or device.

**Available Features:** The person can access all routed pages: Home, Tasks, Add Task, Task Details, Pomodoro, Pomodoro Fullscreen, and Analytics.

**Restrictions:** No permission restrictions are implemented. Data is not separated by user account. Anyone using the same browser profile or application storage can see and change the same saved local data.

### Other roles

Administrator, artist, customer, staff, and other user roles are **Not verified from the repository.**

## 4. Login

Login is not implemented. There are no username, email, password, sign-in button, credential errors, or role-based redirects. Opening the application redirects directly to **Home**.

## 6. Dashboard

There is one Home dashboard for every person who opens the application.

### Home Dashboard

The Home page shows:

- a greeting and the current day and date;
- **Bad**, **Okay**, **Good**, and **Great** feeling choices (with **Good** selected when the page is first created);
- today's focus minutes against a fixed 120-minute goal;
- the completed-task count and total-task count;
- cards for minutes focused, tasks completed, and today's task count;
- tasks created on the current date;
- quick links to **Pomodoro**, **All Tasks**, and **Stats**;
- a weekly overview using the application's current totals; and
- a **Start Pomodoro Session** button.

To mark a task complete from Home, select the checkbox next to the task. Select the task row to open its details. Select **Add task** to create a task.

The Home feeling choice is only a temporary visual selection. It is not saved and is separate from Analytics mood tracking.

## 7. Navigation

The main bottom navigation appears on the Tasks, Pomodoro, and Analytics pages and contains:

| Navigation item | Result |
|---|---|
| **Home** | Opens the Home dashboard. |
| **Tasks** | Opens the task list and category filter. |
| **Pomodoro** | Opens the focus timer. |
| **Analytics** | Opens statistics and mood tracking. |

Home also provides the following navigation:

- **Add task** opens the task form.
- **Pomodoro** and **Start Pomodoro Session** open the timer.
- **All Tasks** opens the task list.
- **Stats** and **View More** open Analytics.
- Selecting a task opens Task Details.

The Add Task page has a back arrow, **Cancel**, **Save Task**, and a trash icon. Task Details has a back button, edit and delete icons, **Mark as Complete**/**Completed**, and **Start Pomodoro**.

There is no implemented sidebar, account dropdown, or accessible profile menu.

## 8. SYSTEM FEATURES

### 8.1 Home Overview

**Purpose**

Shows current task progress, locally stored focus totals, today's tasks, and shortcuts.

**Who Can Use It**

Anyone who opens the application; no account is required.

**How to Access It**

Open the application or select **Home** in the bottom navigation.

**How to Use It**

1. Review **Today's Progress** and the summary cards.
2. Select a feeling to highlight it for the current Home-page session.
3. Select a task row to see its details, or select its checkbox to change its completion status.
4. Use **Add task**, **Pomodoro**, **All Tasks**, **Stats**, **View More**, or **Start Pomodoro Session** to open the related page.

**Expected Result**

The page reacts to saved task changes. The selected Home feeling is not saved. Focus totals only reflect Pomodoro session records already present in local storage; the implemented timer does not create those records.

### 8.2 Task List and Category Filter

**Purpose**

Shows saved tasks, changes their completion state, and filters them by category.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Select **Tasks** in the bottom navigation or **All Tasks** on Home.

**How to Use It**

1. Select **Other** to show all tasks. Although the label says “Other,” this is the implemented all-task view.
2. Select **Work**, **Study**, **Personal**, or **Health** to show only tasks in that category.
3. Select the empty completion circle on a task to toggle its completed state.
4. Select elsewhere on the task card to open Task Details.
5. Select **Add task** to open the task form.

**Expected Result**

The list immediately reflects the chosen category and any completion change. Changes are saved in local storage.

[SCREENSHOT 02 — Tasks Page]

**How to capture**

1. Role to use: no role or account is required.
2. Open **Tasks**.
3. Leave **Other** selected so all available tasks are visible.
4. Capture the category controls, **Today's Tasks**, **Add task**, task cards, and bottom navigation.

**Figure Caption:** Figure 2. Task list and category filter.

### 8.3 Add a Task

**Purpose**

Creates a new locally stored task.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Select **Add task** on Home or Tasks.

**How to Use It**

1. Enter **Task Title**. This is the only required field.
2. Optionally enter **Description (Optional)**.
3. Select a **Category**: Work, Study, Personal, Health, or Other. Work is selected by default.
4. Select a **Priority**: High, Medium, or Low. Medium is selected by default.
5. Enter **Estimated Time (minutes)**. The form starts with 20.
6. Select **Save Task**. It remains disabled while the title is empty.
7. To leave without saving, select **Cancel** or the back arrow.

**Expected Result**

A task with the entered information, an incomplete status, and the current creation date is saved. The application returns to Tasks. The form does not provide a due-date or due-time field.

[SCREENSHOT 03 — Add Task Form]

**How to capture**

1. Role to use: no role or account is required.
2. From Tasks, select **Add task**.
3. Leave the form unsubmitted; optionally enter sample text clearly intended only for the screenshot.
4. Capture all fields, category and priority choices, **Cancel**, and **Save Task**.

**Figure Caption:** Figure 3. Add Task form.

### 8.4 View and Complete a Task

**Purpose**

Shows a task's title, estimated time, displayed due date, category, priority, and description, and lets the user toggle completion.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Select a task on Home or Tasks.

**How to Use It**

1. Review the task information.
2. Select **Mark as Complete** to complete it.
3. Select **Completed** to return it to incomplete status.
4. Select **Start Pomodoro** to open the timer.
5. Select the back button to return to Tasks.

**Expected Result**

The completion state changes immediately and is saved locally. The value displayed as **Due Date** is actually the task's creation date; a separate due date cannot be entered in the visible form.

[SCREENSHOT 04 — Task Details]

**How to capture**

1. Role to use: no role or account is required.
2. Open **Tasks**, then select a task.
3. Do not select edit, delete, or completion controls.
4. Capture the title, action icons, completion button, summary, description, and **Start Pomodoro**.

**Figure Caption:** Figure 4. Task Details page.

### 8.5 Edit a Task

**Purpose**

Updates an existing task's title, description, category, priority, or estimated time.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Open Task Details and select the edit icon beside the title.

**How to Use It**

1. Change any displayed task fields.
2. Keep **Task Title** non-empty.
3. Select **Save Task**.
4. Select **Cancel** if you do not want to submit the edits.

**Expected Result**

The existing task is updated in local storage, and the application returns to Tasks. The page heading still says **Add Task** while editing; there is no separate “Edit Task” heading.

### 8.6 Delete a Task

**Purpose**

Permanently removes a task from local storage.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Open Task Details and select the trash icon. A trash icon also appears on the Add Task form.

**How to Use It**

- **From Task Details:** select the trash icon. The task is deleted immediately and the application returns to Tasks; no confirmation is shown.
- **From the task form:** select the trash icon. In the **Delete Task** confirmation, select **Delete** or **Cancel**. The task is removed only when the form was opened to edit an existing task. On a new blank task form, selecting **Delete** removes nothing and returns to Tasks.

**Expected Result**

For an existing task, it disappears from task lists and local storage.

[SCREENSHOT 05 — Delete Task Confirmation]

**How to capture**

1. Role to use: no role or account is required.
2. Open an existing task, select edit, then select the trash icon on the form.
3. Do not select **Delete**.
4. Capture the **Delete Task** message and **Cancel**/**Delete** buttons; then select **Cancel** after capturing.

**Figure Caption:** Figure 5. Delete Task confirmation on the task form.

### 8.7 Pomodoro Timer

**Purpose**

Provides a shared timer that can count down from 20 minutes or count upward from zero.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Select **Pomodoro** in the bottom navigation, a Pomodoro shortcut on Home, or **Start Pomodoro** on Task Details.

**How to Use It**

1. The timer initially shows **20:00** in count-down mode.
2. Select **Start** to run it. The button changes to **Pause**.
3. Select **Pause** to stop it without resetting the displayed time.
4. To change mode, select **Timer Mode**, choose **20:00 → 00:00** or **00:00 → ∞**, and select **Confirm**. Changing mode resets the timer.
5. Select **Fullscreen** for the large timer view.
6. In Fullscreen, use play/pause. Use stop to stop and reset the timer. Use the close icon to return to Pomodoro.

**Expected Result**

Count-down mode stops at zero. Count-up mode continues until manually paused or reset. Moving between the normal and Fullscreen timer uses the same in-memory timer state. No completion message, alarm, task link, or saved focus session is implemented.

[SCREENSHOT 06 — Pomodoro Timer]

**How to capture**

1. Role to use: no role or account is required.
2. Open **Pomodoro**.
3. Capture the timer at rest, including **Start**, **Timer Mode**, **Fullscreen**, **White Noise**, and bottom navigation.

**Figure Caption:** Figure 6. Pomodoro timer.

[SCREENSHOT 07 — Timer Mode]

**How to capture**

1. Role to use: no role or account is required.
2. On Pomodoro, select **Timer Mode**.
3. Capture both mode choices and the **Cancel**/**Confirm** controls without confirming a change.

**Figure Caption:** Figure 7. Timer Mode choices.

[SCREENSHOT 08 — Fullscreen Timer]

**How to capture**

1. Role to use: no role or account is required.
2. On Pomodoro, select **Fullscreen**.
3. Capture the large timer, close, mute, mode, settings, play/pause, and stop controls.

**Figure Caption:** Figure 8. Fullscreen Pomodoro timer.

### 8.8 White Noise Selection

**Purpose**

Displays a choice of None, Tic-tac, Countdown, Wind with crickets, Class Room, or Wilderness.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Select **White Noise** on Pomodoro. In Fullscreen, select the settings icon.

**How to Use It**

1. Open the White Noise sheet.
2. Select one option.
3. Select **Confirm**.

**Expected Result**

The sheet closes. Audio playback and persistence are not implemented, so the choice does not produce sound and is not retained after leaving and recreating the page.

[SCREENSHOT 09 — White Noise Choices]

**How to capture**

1. Role to use: no role or account is required.
2. Open Pomodoro and select **White Noise**.
3. Capture all choices and **Confirm**.

**Figure Caption:** Figure 9. White Noise selection sheet.

### 8.9 Analytics

**Purpose**

Shows locally calculated focus, completed-task, productivity, task-category, and mood information.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Select **Analytics** in the bottom navigation, **Stats**, or **View More** on Home.

**How to Use It**

1. Select **Week**, **Month**, or **Year**.
2. Review **Focus Minutes**, **Tasks Completed**, and **Productivity**.
3. Review the Focus Time and Tasks Completed bar charts.
4. Review the percentage distribution for Work, Study, Personal, and Health tasks. Tasks in Other are not displayed as a category percentage.
5. Use Mood Tracking as described below.

**Expected Result**

Week covers the most recent seven days. Month groups roughly the most recent 28 days into seven four-day buckets. Year displays the current and previous six calendar months. Completed tasks are grouped using their creation date, not the date they were completed. Productivity is the completed-task total divided by a fixed target of 10 for Week, 40 for Month, or 480 for Year, capped at 100%.

Focus charts read saved Pomodoro sessions, but the implemented timer does not save sessions. Focus values will therefore remain zero unless compatible records already exist in local storage through some method not provided by the user interface.

[SCREENSHOT 10 — Analytics]

**How to capture**

1. Role to use: no role or account is required.
2. Open **Analytics** and leave **Week** selected.
3. Capture the statistics, charts, category section, mood tracking, and bottom navigation. Use a full-page capture if needed.

**Figure Caption:** Figure 10. Weekly Analytics page.

### 8.10 Mood Tracking

**Purpose**

Saves a dated mood entry and displays up to the seven most recent entries.

**Who Can Use It**

Anyone using the application.

**How to Access It**

Open **Analytics** and scroll to **Mood Tracking**.

**How to Use It**

1. Select **Bad**, **Okay**, **Good**, or **Great**. Each selection immediately creates an entry; there is no separate Save button.
2. Select **Hide list** to hide entries, or **Show list** to display them again.
3. Select **Clear** to remove all mood entries. No confirmation is shown.

**Expected Result**

The chosen mood and date are saved locally. The seven most recent moods appear newest first. **Clear** permanently empties the saved mood list.

[SCREENSHOT 11 — Mood Tracking]

**How to capture**

1. Role to use: no role or account is required.
2. On Analytics, select a mood if it is acceptable to create a local entry.
3. Capture the four mood buttons, **Hide list**, **Clear**, and recent entries.

**Figure Caption:** Figure 11. Mood Tracking controls and recent entries.

## 9. CRUD OPERATIONS

The Tasks module is the only complete record-management module.

### Adding a Record

1. Open **Tasks**.
2. Select **Add task**.
3. Complete **Task Title** and any optional fields.
4. Select **Save Task**.
5. The application saves the task locally and returns to Tasks.

### Viewing Records

Open Tasks to view the list. Select a task card to view its Task Details. Home also shows tasks created today.

### Editing a Record

Open Task Details, select the edit icon, change the fields, and select **Save Task**.

### Deleting a Record

Open Task Details and select the trash icon for immediate deletion, or open edit mode, select the trash icon, and confirm **Delete**.

Mood entries support create, recent-list view, and clear-all operations. Individual mood editing and deletion are not implemented. Pomodoro session creation is not connected to a user-facing action.

## 10. Search and Filtering

### Category filtering

On Tasks, select **Work**, **Study**, **Personal**, or **Health** to show only that category. Select **Other** to show all tasks, including tasks from every category.

Text search, sorting controls, and pagination are not implemented.

## 12. Reports / Analytics

The Analytics page is described in Section 8.9. It presents on-screen statistics and charts only. There is no report download, print, export, or sharing function.

## 13. Profile / Account

No accessible or functional Profile/Account feature is implemented. A static Profile page file exists but is not registered in application routes. Its edit, account, preference, support, and **LOG OUT** controls have no implemented actions. Account viewing, account editing, password changes, and notification settings are therefore **Not verified from the repository.**

## 14. Logout

Logout is not implemented because there is no login or authenticated session. To stop using the application, close the browser tab or mobile application. This does not clear locally saved tasks or mood entries.

### Data Storage and Privacy

- Tasks and Analytics mood entries are stored only in local storage for the current browser or application web view.
- Data is not associated with an authenticated identity.
- Clearing site/application storage may remove saved data.
- The user interface does not provide backup, restore, synchronization, import, or export.
- Server storage and cloud synchronization are **Not verified from the repository.**

## 15. Common User Problems

| Problem | Possible Reason | What the User Should Do |
|---|---|---|
| The application does not ask me to log in. | Login is not implemented. | Continue directly from Home. Do not enter credentials anywhere. |
| **Save Task** is disabled. | **Task Title** is empty. | Enter a task title. |
| Selecting **Save Task** does not save. | The title may contain only spaces. | Enter at least one visible character in **Task Title**, then select **Save Task**. |
| I cannot enter a due date or time. | The task form does not provide those fields. | Use the description if you need a reminder in text; scheduling is not implemented. |
| **Other** displays every task. | The implementation uses **Other** as the all-task filter. | Select a named category to narrow the list. |
| A task disappeared immediately after I selected delete on Task Details. | That delete control has no confirmation. | Re-create the task if deletion was accidental; undo/restore is not implemented. |
| The timer reached zero but focus statistics did not change. | The timer is not connected to Pomodoro session storage. | No user-facing workaround is implemented. |
| White Noise is silent. | Audio playback is not implemented. | Continue using the timer without sound. |
| My Home feeling does not appear in Analytics. | The Home choice is visual only. | Record the mood in **Analytics → Mood Tracking**. |
| **Clear** removed all moods. | Clear-all has no confirmation. | Re-enter moods if needed; restore is not implemented. |
| I cannot find Profile or Logout. | Profile has no route, and authentication/logout is not implemented. | Close the application when finished. |
| Some icons or images do not appear. | Referenced image assets are absent from this checkout. | The missing asset cannot be corrected through the user interface. |
| My saved data disappeared. | Browser/application storage may have been cleared or a different browser/profile may be in use. | Return to the original browser/profile if available. Backup and recovery are not implemented. |
