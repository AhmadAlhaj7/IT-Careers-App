namespace ItCareers.Domain.Common;

// One field, both languages — the product is bilingual (Arabic + English) throughout,
// so any title, description, or explanation carries both instead of picking one.
public record LocalizedText(string Ar, string En);
