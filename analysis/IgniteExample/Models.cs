using System.Collections.Generic;

public class Country
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Iso3 { get; set; }
    public string? Iso2 { get; set; }
    public string? NumericCode { get; set; }
    public string? PhoneCode { get; set; }
    public string? Capital { get; set; }
    public string? Currency { get; set; }
    public string? CurrencyName { get; set; }
    public string? CurrencySymbol { get; set; }
    public string? Tld { get; set; }
    public string? Native { get; set; }
    public string? Region { get; set; }
    public string? RegionId { get; set; }
    public string? Subregion { get; set; }
    public string? SubregionId { get; set; }
    public string? Nationality { get; set; }
    public List<TimeZone>? Timezones { get; set; }
    public Translations? Translations { get; set; }
    public string? Latitude { get; set; }
    public string? Longitude { get; set; }
    public string? Emoji { get; set; }
    public string? EmojiU { get; set; }
}

public class TimeZone
{
    public string? ZoneName { get; set; }
    public int GmtOffset { get; set; }
    public string? GmtOffsetName { get; set; }
    public string? Abbreviation { get; set; }
    public string? TzName { get; set; }
}

public class Translations
{
    public string? Kr { get; set; }
    public string? PtBR { get; set; }
    public string? Pt { get; set; }
    public string? Nl { get; set; }
    public string? Hr { get; set; }
    public string? Fa { get; set; }
    public string? De { get; set; }
    public string? Es { get; set; }
    public string? Fr { get; set; }
    public string? Ja { get; set; }
    public string? It { get; set; }
    public string? Cn { get; set; }
    public string? Tr { get; set; }
}
