export function formatLabel(str: string): string {
    // Handles: snake_case, camelCase, PascalCase, and also just lowercase
    // 1. Replace underscores/dashes with space
    let label = str.replace(/[_\-]+/g, ' ');
    // 2. Insert space before uppercase letters (for camelCase)
    label = label.replace(/([a-z])([A-Z])/g, '$1 $2');
    // 3. Capitalize each word
    return label.replace(/\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }