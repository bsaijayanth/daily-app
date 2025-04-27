export interface RoutineTask {
    id: string,
    title: string,
    frequency: 'daily' | 'alternate' | 'weekly'
    lastCompletedDate: string,
    createdAt: string,
    status: 'incomplete' | 'complete'
}

export interface MiscTask {
    id: string,
    title: string,
    plannedDate: string,
    createdAt: string,
    status: 'incomplete' | 'complete'
}

