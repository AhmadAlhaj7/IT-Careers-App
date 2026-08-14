namespace ItCareers.Domain.Enums;

// Fixed, narrated order — a specialization page always tells the same story: what they do,
// a day in the life, market demand, salary, pros/cons, is-this-for-you, skills, myths, then
// a closing summary. Sections can be toggled on/off but never reordered or added to.
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
}
