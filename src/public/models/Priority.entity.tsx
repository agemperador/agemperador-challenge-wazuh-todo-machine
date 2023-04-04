export const priorities = Object.freeze({
    "HIGH": {
      priority:'High',
      color: '#FF0000'
    },
    "MEDIUM": {
      priority:'Medium',
      color: '#00FF00'
    },
    "LOW": {
      priority:'Low',
      color: '#0000FF'
    },
    "PERSONAL": {
      priority:'Personal',
      color: '#FFF'
    },
  } as const);


export interface Priority {
  priority: string;
  color: string;
}
