import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang, ScreeningSession, TeacherProfile } from "./types";

const emptyTeacher: TeacherProfile = {
  name: "",
  school: "",
  district: "bengaluru-urban",
  schoolType: "government",
  className: "",
};

interface AppState {
  hydrated: boolean;
  uiLang: Lang;
  teacher: TeacherProfile;
  sessions: ScreeningSession[];
  currentId: string | null;
  setHydrated: (v: boolean) => void;
  setUiLang: (lang: Lang) => void;
  setTeacher: (t: Partial<TeacherProfile>) => void;
  upsertSession: (s: ScreeningSession) => void;
  setCurrent: (id: string | null) => void;
  getSession: (id: string) => ScreeningSession | undefined;
  deleteSession: (id: string) => void;
  clearAll: () => void;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      uiLang: "en",
      teacher: emptyTeacher,
      sessions: [],
      currentId: null,
      setHydrated: (v) => set({ hydrated: v }),
      setUiLang: (uiLang) => set({ uiLang }),
      setTeacher: (t) => set({ teacher: { ...get().teacher, ...t } }),
      upsertSession: (s) =>
        set({
          sessions: [s, ...get().sessions.filter((x) => x.id !== s.id)],
          currentId: s.id,
        }),
      setCurrent: (currentId) => set({ currentId }),
      getSession: (id) => get().sessions.find((s) => s.id === id),
      deleteSession: (id) =>
        set({
          sessions: get().sessions.filter((s) => s.id !== id),
          currentId: get().currentId === id ? null : get().currentId,
        }),
      clearAll: () => set({ sessions: [], currentId: null }),
    }),
    {
      name: "roar-ka-v1",
      skipHydration: true,
      partialize: (s) => ({
        uiLang: s.uiLang,
        teacher: s.teacher,
        sessions: s.sessions,
        currentId: s.currentId,
      }),
    },
  ),
);

export function rehydrateApp() {
  const finish = () => useApp.getState().setHydrated(true);
  const unsub = useApp.persist.onFinishHydration(finish);
  void useApp.persist.rehydrate();
  if (useApp.persist.hasHydrated()) finish();
  return unsub;
}
