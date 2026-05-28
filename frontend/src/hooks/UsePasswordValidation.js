export function usePasswordValidation(password) {
  const rules = [
    { id: "length", label: "Mínimo 8 caracteres", test: /^.{8,}$/ },
    { id: "upper", label: "1 letra maiúscula", test: /[A-Z]/ },
    { id: "number", label: "1 número", test: /[0-9]/ },
    { id: "special", label: "1 caractere especial", test: /[^A-Za-z0-9]/ },
  ];

  const checks = rules.map((rule) => ({
    id: rule.id,
    label: rule.label,
    valid: rule.test.test(password),
  }));

  const isValid = checks.every((c) => c.valid);

  return { checks, isValid };
}
