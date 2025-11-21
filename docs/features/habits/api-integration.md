# Habits API Integration Documentation

## Overview

This document details the API integration patterns and data flow for the habits system, including CRUD operations, error handling, and data synchronization.

## API Endpoints

### Base URL

```
/api/habits
```

### Endpoints

#### GET /api/habits

Retrieve all habits for the current user.

**Request:**

```javascript
// No parameters required
GET / api / habits;
```

**Response:**

```javascript
{
  success: true,
  data: [
    {
      id: "habit_123",
      name: "Morning Workout",
      description: "Start the day with exercise",
      category: "Body",
      difficulty: "Medium",
      frequencyType: "Daily",
      frequency: "Daily",
      selectedDays: [],
      notificationsEnabled: false,
      notificationTime: "08:00",
      xpReward: 31,
      baseXp: 25,
      bonusMultiplier: 1.25,
      bonusSource: "Warrior bonus",
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
      completedDates: ["2024-01-15", "2024-01-16"],
      currentStreak: 2,
      bestStreak: 5,
      completionRate: 0.85
    }
  ]
}
```

#### POST /api/habits

Create a new habit.

**Request:**

```javascript
POST /api/habits
Content-Type: application/json

{
  name: "Evening Meditation",
  description: "15 minutes of mindfulness",
  category: "Mind",
  difficulty: "Easy",
  frequencyType: "Daily",
  frequency: "Daily",
  selectedDays: [],
  notificationsEnabled: true,
  notificationTime: "20:00",
  xpReward: 10,
  baseXp: 10,
  bonusMultiplier: 1,
  bonusSource: null
}
```

**Response:**

```javascript
{
  success: true,
  data: {
    id: "habit_456",
    ...habitData,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    completedDates: [],
    currentStreak: 0,
    bestStreak: 0,
    completionRate: 0
  }
}
```

#### PUT /api/habits/:id

Update an existing habit.

**Request:**

```javascript
PUT /api/habits/habit_123
Content-Type: application/json

{
  name: "Morning Workout (Updated)",
  difficulty: "Hard",
  xpReward: 50,
  baseXp: 50,
  bonusMultiplier: 1
}
```

**Response:**

```javascript
{
  success: true,
  data: {
    ...updatedHabitData,
    updatedAt: "2024-01-15T11:00:00Z"
  }
}
```

#### DELETE /api/habits/:id

Delete a habit.

**Request:**

```javascript
DELETE / api / habits / habit_123;
```

**Response:**

```javascript
{
  success: true,
  message: "Habit deleted successfully"
}
```

#### POST /api/habits/:id/complete

Mark a habit as complete for a specific date.

**Request:**

```javascript
POST /api/habits/habit_123/complete
Content-Type: application/json

{
  date: "2024-01-15",
  completedAt: "2024-01-15T08:30:00Z"
}
```

**Response:**

```javascript
{
  success: true,
  data: {
    habitId: "habit_123",
    date: "2024-01-15",
    xpEarned: 31,
    newStreak: 3,
    completionRate: 0.87
  }
}
```

#### GET /api/habits/stats

Get habit statistics for the user.

**Request:**

```javascript
GET /api/habits/stats?period=week&startDate=2024-01-15&endDate=2024-01-21
```

**Response:**

```javascript
{
  success: true,
  data: {
    totalHabits: 12,
    completedToday: 5,
    currentStreak: 7,
    bestStreak: 15,
    totalXP: 1250,
    weeklyStats: {
      completed: 35,
      total: 84,
      completionRate: 0.42
    },
    categoryBreakdown: {
      Body: { count: 5, completed: 3 },
      Mind: { count: 4, completed: 2 },
      Spirit: { count: 2, completed: 0 },
      Creative: { count: 1, completed: 1 }
    },
    difficultyBreakdown: {
      Easy: { count: 6, completed: 4 },
      Medium: { count: 4, completed: 2 },
      Hard: { count: 2, completed: 1 }
    }
  }
}
```

## Context Integration

### HabitsContext

The HabitsContext manages the state and API interactions for habits.

```javascript
import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";

const HabitsContext = createContext();

const habitsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_HABITS":
      return { ...state, habits: action.payload, loading: false };
    case "ADD_HABIT":
      return { ...state, habits: [...state.habits, action.payload] };
    case "UPDATE_HABIT":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.id ? action.payload : habit
        ),
      };
    case "DELETE_HABIT":
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.payload),
      };
    case "COMPLETE_HABIT":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.habitId
            ? { ...habit, ...action.payload.updates }
            : habit
        ),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const HabitsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitsReducer, {
    habits: [],
    loading: true,
    error: null,
  });

  const { user } = useAuth();

  // API functions
  const fetchHabits = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch("/api/habits");
      const data = await response.json();

      if (data.success) {
        dispatch({ type: "SET_HABITS", payload: data.data });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.message });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const addHabit = async (habitData) => {
    try {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });

      const data = await response.json();

      if (data.success) {
        dispatch({ type: "ADD_HABIT", payload: data.data });
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const updateHabit = async (id, updates) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        dispatch({ type: "UPDATE_HABIT", payload: data.data });
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const deleteHabit = async (id) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        dispatch({ type: "DELETE_HABIT", payload: id });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const completeHabit = async (habitId, date) => {
    try {
      const response = await fetch(`/api/habits/${habitId}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch({
          type: "COMPLETE_HABIT",
          payload: {
            habitId,
            updates: {
              completedDates: [...currentHabit.completedDates, date],
              currentStreak: data.data.newStreak,
              completionRate: data.data.completionRate,
            },
          },
        });
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  // Helper functions
  const getHabitsByDate = (date) => {
    return state.habits.filter((habit) => {
      if (habit.frequencyType === "Daily") {
        return true;
      } else {
        const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        return habit.selectedDays.includes(dayOfWeek);
      }
    });
  };

  const getStats = async (period = "week") => {
    try {
      const response = await fetch(`/api/habits/stats?period=${period}`);
      const data = await response.json();

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  // Load habits on mount
  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const value = {
    ...state,
    addHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
    getHabitsByDate,
    getStats,
    fetchHabits,
  };

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
};
```

## Error Handling

### Error Types

1. **Network Errors**

   - Connection timeout
   - Server unavailable
   - CORS issues

2. **Validation Errors**

   - Missing required fields
   - Invalid data formats
   - Constraint violations

3. **Authorization Errors**

   - Not authenticated
   - Insufficient permissions
   - Token expired

4. **Business Logic Errors**
   - Habit already completed today
   - Invalid date range
   - Resource not found

### Error Handling Pattern

```javascript
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Log error for debugging
    console.error(`API Error: ${endpoint}`, error);

    // Show user-friendly message
    showNotification(error.message || "Something went wrong", "error");

    // Re-throw for component handling
    throw error;
  }
};
```

### Retry Logic

```javascript
const retryApiCall = async (endpoint, options = {}, maxRetries = 3) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall(endpoint, options);
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }

  throw lastError;
};
```

## Data Synchronization

### Optimistic Updates

```javascript
const addHabitOptimistic = async (habitData) => {
  // Create temporary habit with client-side ID
  const tempHabit = {
    ...habitData,
    id: `temp_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Update UI immediately
  dispatch({ type: "ADD_HABIT", payload: tempHabit });

  try {
    // Make API call
    const response = await addHabit(habitData);

    // Replace temp habit with real data
    dispatch({ type: "UPDATE_HABIT", payload: response });
  } catch (error) {
    // Revert on error
    dispatch({ type: "DELETE_HABIT", payload: tempHabit.id });
    throw error;
  }
};
```

### Real-time Updates

```javascript
// WebSocket connection for real-time updates
const useRealtimeHabits = () => {
  const { dispatch } = useHabits();

  useEffect(() => {
    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/habits`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "HABIT_CREATED":
          dispatch({ type: "ADD_HABIT", payload: message.data });
          break;
        case "HABIT_UPDATED":
          dispatch({ type: "UPDATE_HABIT", payload: message.data });
          break;
        case "HABIT_DELETED":
          dispatch({ type: "DELETE_HABIT", payload: message.data.id });
          break;
        case "HABIT_COMPLETED":
          dispatch({
            type: "COMPLETE_HABIT",
            payload: {
              habitId: message.data.habitId,
              updates: message.data.updates,
            },
          });
          break;
      }
    };

    return () => ws.close();
  }, [dispatch]);
};
```

## Caching Strategy

### Local Storage Cache

```javascript
const useHabitsCache = () => {
  const CACHE_KEY = "habits_cache";
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  const getCachedHabits = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          return data;
        }
      }
    } catch (error) {
      console.warn("Cache read error:", error);
    }
    return null;
  };

  const setCachedHabits = (data) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.warn("Cache write error:", error);
    }
  };

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
  };

  return { getCachedHabits, setCachedHabits, clearCache };
};
```

### Service Worker Cache

```javascript
// Cache API responses for offline support
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/habits")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          const responseClone = response.clone();
          caches
            .open("habits-api")
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        });
      })
    );
  }
});
```

## Performance Optimization

### Request Batching

```javascript
const batchApiCalls = async (calls) => {
  const batchEndpoint = "/api/batch";

  const batchRequest = {
    requests: calls.map((call) => ({
      method: call.method || "GET",
      url: call.url,
      body: call.body,
    })),
  };

  const response = await fetch(batchEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batchRequest),
  });

  return response.json();
};
```

### Request Deduplication

```javascript
const requestCache = new Map();

const deduplicatedFetch = async (url, options) => {
  const cacheKey = `${url}_${JSON.stringify(options)}`;

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  const request = fetch(url, options);
  requestCache.set(cacheKey, request);

  try {
    const response = await request;
    return response;
  } finally {
    requestCache.delete(cacheKey);
  }
};
```

## Testing

### Mock API

```javascript
// test/mocks/habitsApi.js
export const mockHabitsApi = {
  getHabits: jest.fn(() =>
    Promise.resolve({
      success: true,
      data: mockHabits,
    })
  ),

  addHabit: jest.fn((habit) =>
    Promise.resolve({
      success: true,
      data: { ...habit, id: "new_habit_id" },
    })
  ),

  updateHabit: jest.fn((id, updates) =>
    Promise.resolve({
      success: true,
      data: { id, ...updates },
    })
  ),

  deleteHabit: jest.fn(() =>
    Promise.resolve({
      success: true,
      message: "Habit deleted",
    })
  ),
};
```

### Integration Tests

```javascript
// test/integration/habits.test.js
describe("Habits API Integration", () => {
  test("should fetch habits successfully", async () => {
    const { result } = renderHook(() => useHabits());

    await act(async () => {
      await result.current.fetchHabits();
    });

    expect(result.current.habits).toHaveLength(mockHabits.length);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("should handle API errors gracefully", async () => {
    mockApi.getHabits.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useHabits());

    await act(async () => {
      await result.current.fetchHabits();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.loading).toBe(false);
  });
});
```

## Security Considerations

### Input Validation

```javascript
const validateHabitData = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Habit name is required";
  }

  if (data.name && data.name.length > 100) {
    errors.name = "Habit name must be less than 100 characters";
  }

  if (!["Body", "Mind", "Spirit", "Creative"].includes(data.category)) {
    errors.category = "Invalid category";
  }

  if (!["Easy", "Medium", "Hard"].includes(data.difficulty)) {
    errors.difficulty = "Invalid difficulty";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};
```

### Rate Limiting

```javascript
const rateLimit = (maxRequests = 10, windowMs = 60000) => {
  const requests = [];

  return (req, res, next) => {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Remove old requests
    while (requests.length > 0 && requests[0] < windowStart) {
      requests.shift();
    }

    if (requests.length >= maxRequests) {
      return res.status(429).json({ error: "Too many requests" });
    }

    requests.push(now);
    next();
  };
};
```

## Monitoring and Analytics

### API Performance Monitoring

```javascript
const trackApiCall = async (endpoint, options) => {
  const startTime = performance.now();

  try {
    const response = await fetch(endpoint, options);
    const endTime = performance.now();

    // Track performance metrics
    analytics.track("api_call", {
      endpoint,
      method: options.method || "GET",
      duration: endTime - startTime,
      status: response.status,
      success: response.ok,
    });

    return response;
  } catch (error) {
    const endTime = performance.now();

    analytics.track("api_error", {
      endpoint,
      method: options.method || "GET",
      duration: endTime - startTime,
      error: error.message,
    });

    throw error;
  }
};
```

### Error Tracking

```javascript
const trackError = (error, context) => {
  errorReporting.captureException(error, {
    tags: {
      component: "habits",
      ...context,
    },
    extra: {
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    },
  });
};
```

## Best Practices

1. **Always handle errors** - Never let API errors go unhandled
2. **Use optimistic updates** - Improve perceived performance
3. **Implement proper caching** - Reduce unnecessary API calls
4. **Validate inputs** - Prevent invalid data from reaching the server
5. **Use proper loading states** - Provide good UX during data fetching
6. **Implement retry logic** - Handle transient failures gracefully
7. **Monitor performance** - Track API response times and error rates
8. **Secure endpoints** - Validate authentication and authorization
9. **Document APIs** - Keep API documentation up to date
10. **Test thoroughly** - Cover success, error, and edge cases
