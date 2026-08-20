namespace ItCareers.Domain.Enums;

// Fixed, narrated order — a specialization page always tells the same story: what they do,
// a day in the life, market demand, salary, pros/cons, is-this-for-you, skills, sub-fields you
// could branch into, myths, then a closing summary. Sections can be toggled on/off but never
// reordered. New values only ever get APPENDED with a fresh number (never renumbered/inserted
// in the middle) — the numeric value gets persisted in existing rows' Sections JSON, so
// reusing or shifting a number would reinterpret already-saved data as the wrong section.
// Display order for the public/admin UI comes from web/src/lib/specializationSections.ts's
// array order instead, which is free to place a section wherever it belongs regardless of its
// enum number here.
public enum SpecializationSectionKey
{
    WhatTheyDo = 1,
    TypicalDay = 2,
    MarketDemand = 3,
    SalaryAndCareer = 4,
    ProsAndCons = 5,
    FitCheck = 6,
    SkillsAndTools = 7,
    CommonMyths = 8,
    Conclusion = 9,
    SubSpecializations = 10,
}
