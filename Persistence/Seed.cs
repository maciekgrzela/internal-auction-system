using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Persistence.Contexts;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {

            if (!userManager.Users.Any())
            {

                if (!context.UsersCompanyDetails.Any())
                {
                    var companyDetails = new List<UsersCompanyDetails>
                    {
                        new UsersCompanyDetails
                        {
                            Name = "Firma XYZ Sp. Z.o.o.",
                            Street = "Długa",
                            Number = "11A",
                            PostalCode = "50-515",
                            City = "Wrocław",
                            NIP = "6576573030",
                            PhoneNumber = "690690690"
                        },
                        new UsersCompanyDetails
                        {
                            Name = "Firma ABC Sp. Z.o.o.",
                            Street = "Mała",
                            Number = "98",
                            PostalCode = "35-515",
                            City = "Kraków",
                            NIP = "6576573030",
                            PhoneNumber = "690690690"
                        },
                        new UsersCompanyDetails
                        {
                            Name = "Firma XYZ Sp. Z.o.o.",
                            Street = "Niska",
                            Number = "35C",
                            PostalCode = "50-232",
                            City = "Warszawa",
                            NIP = "6576573030",
                            PhoneNumber = "690690690"
                        }
                    };

                    context.AddRange(companyDetails);
                    context.SaveChanges();
                }


                var users = new List<AppUser>
                {
                    new AppUser {
                        FirstName = "Jan",
                        LastName = "Kowalski",
                        UserName = "janek@mail.com",
                        Email = "janek@mail.com",
                        Pesel = "12345678901",
                        UsersCompanyDetailsId = 1
                    },
                    new AppUser {
                        FirstName = "Tomasz",
                        LastName = "Adamski",
                        UserName = "tomek@mail.com",
                        Email = "tomek@mail.com",
                        Pesel = "12345678901",
                        UsersCompanyDetailsId = 2
                    },
                    new AppUser {
                        FirstName = "Adam",
                        LastName = "Nowicki",
                        UserName = "adam@mail.com",
                        Email = "adam@mail.com",
                        Pesel = "12345678901",
                        UsersCompanyDetailsId = 3
                    },
                    new AppUser {
                        FirstName = "Narcin",
                        LastName = "Nowak",
                        UserName = "marcin@mail.com",
                        Email = "marcin@mail.com",
                        Pesel = "97110705275"
                    }
                };
                if (!roleManager.Roles.Any())
                {
                    await roleManager.CreateAsync(new IdentityRole("Admin"));
                    await roleManager.CreateAsync(new IdentityRole("User"));
                }
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "zaq1@WSX");
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }

            if (!context.Filters.Any())
            {
                var filters = new List<Filter>
                {
                    new Filter { Name = "Złącza", Value = "D-Sub(VGA)" },
                    new Filter { Name = "Złącza", Value = "DVI" },
                    new Filter { Name = "Złącza", Value = "HDMI" },
                    new Filter { Name = "Złącza", Value = "RJ45" },
                    new Filter { Name = "Złącza", Value = "RJ11" },
                    new Filter { Name = "Złącza", Value = "FireWire" },
                    new Filter { Name = "Złącza", Value = "Audio-Out" },
                    new Filter { Name = "Złącza", Value = "Audio-In" },
                    new Filter { Name = "Złącza", Value = "Mic-In" },
                    new Filter { Name = "Złącza", Value = "USB 2.0" },
                    new Filter { Name = "Złącza", Value = "USB 3.0" },
                    new Filter { Name = "Złącza", Value = "USB 3.1" },
                    new Filter { Name = "Złącza", Value = "USB-C" },
                    new Filter { Name = "Złącza", Value = "Czytnik kart SD" },
                    new Filter { Name = "Złącza", Value = "Thunderbolt3" },
                    new Filter { Name = "Złącza", Value = "PS-2" },
                    new Filter { Name = "Złącza", Value = "eSATA" },
                    new Filter { Name = "Złącza", Value = "DisplayPort" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "800x600" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "1024x600" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "1024x768" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "1280x720" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "1152x768" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "1366x768" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "1600x900" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "1920x1080" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "2560x1440" },
                    new Filter { Name = "Rozdzielczość ekranu", Value = "3840x2160" },
                    new Filter { Name = "Wbudowane głośniki" },
                    new Filter { Name = "Rodzaj matrycy", Value = "TN" },
                    new Filter { Name = "Rodzaj matrycy", Value = "VA" },
                    new Filter { Name = "Rodzaj matrycy", Value = "IPS" },
                    new Filter { Name = "Rodzaj matrycy", Value = "S-IPS" },
                    new Filter { Name = "Rodzaj matrycy", Value = "E-IPS" },
                    new Filter { Name = "Rodzaj matrycy", Value = "H-IPS" },
                    new Filter { Name = "Rodzaj matrycy", Value = "ACE" },
                    new Filter { Name = "Rodzaj matrycy", Value = "MVA" },
                    new Filter { Name = "Rodzaj matrycy", Value = "PVA" },
                    new Filter { Name = "Rodzaj matrycy", Value = "OLED" },
                    new Filter { Name = "Odświeżanie", Value = "50" },
                    new Filter { Name = "Odświeżanie", Value = "60" },
                    new Filter { Name = "Odświeżanie", Value = "75" },
                    new Filter { Name = "Odświeżanie", Value = "80" },
                    new Filter { Name = "Odświeżanie", Value = "100" },
                    new Filter { Name = "Odświeżanie", Value = "120" },
                    new Filter { Name = "Odświeżanie", Value = "144" },
                    new Filter { Name = "Odświeżanie", Value = "200" },
                    new Filter { Name = "Kontrast", Value = "1000:1" },
                    new Filter { Name = "Kontrast", Value = "2000:1" },
                    new Filter { Name = "Kontrast", Value = "5000:1" },
                    new Filter { Name = "Kontrast", Value = "10000:1" },
                    new Filter { Name = "Dotykowy ekran" },
                    new Filter { Name = "Karty rozszerzeń", Value = "Karta graficzna" },
                    new Filter { Name = "Karty rozszerzeń", Value = "Karta dzwiekowa" },
                    new Filter { Name = "Karty rozszerzeń", Value = "Karta sieciowa" },
                    new Filter { Name = "Karty rozszerzeń", Value = "Karta - port szeregowy" },
                    new Filter { Name = "Karty rozszerzeń", Value = "Karta - port rownolegly" },
                    new Filter { Name = "Przekątna", Value = "21"},
                    new Filter { Name = "Przekątna", Value = "21.5"},
                    new Filter { Name = "Przekątna", Value = "23"},
                    new Filter { Name = "Przekątna", Value = "23.8"},
                    new Filter { Name = "Przekątna", Value = "24.5"},
                    new Filter { Name = "Przekątna", Value = "25"},
                    new Filter { Name = "Przekątna", Value = "30"}
                };
                context.Filters.AddRange(filters);
                context.SaveChanges();
            }

            if (!context.Destinations.Any())
            {
                var destinations = new List<Destination>
                {
                    new Destination { Description = "Sprzedaż" },
                    new Destination { Description = "Do oddania" },
                    new Destination { Description = "Elektrośmieci" }
                };
                context.Destinations.AddRange(destinations);
                context.SaveChanges();
            }

            if (!context.Interests.Any())
            {
                var interests = new List<Interest>
                {
                    new Interest { Description = "Żadne" },
                    new Interest { Description = "Małe" },
                    new Interest { Description = "Średnie" },
                    new Interest { Description = "Duże" }
                };
                context.Interests.AddRange(interests);
                context.SaveChanges();
            }

            if (!context.Locations.Any())
            {
                var locations = new List<Location>
                {
                    new Location { City = "Wrocław", PostalCode = "50-343", Street = "Sucha", Number = "3" },
                    new Location { City = "Rzeszów", PostalCode = "50-343", Street = "Generała Maczka", Number = "6" },
                    new Location { City = "Gdańsk", PostalCode = "50-343", Street = "Jana z Kolna", Number = "11" },
                    new Location { City = "Frankfurt", PostalCode = "10-111", Street = "Bockenheimer Landstrasse", Number = "17/19" },
                    new Location { City = "Londyn", PostalCode = "50-342", Street = "Uxbridge Road", Number = "40-44" }
                };
                context.Locations.AddRange(locations);
                context.SaveChanges();
            }

            if (!context.Storages.Any())
            {
                var storages = new List<Storage>
                {
                    new Storage { Name = "WR1", Description = "Pierwszy magazyn we Wroclawiu (pok.301 p.3)", LocationId = 5},
                    new Storage { Name = "WR2", Description = "Drugi magazyn we Wroclawiu (pok.203 p.2)", LocationId = 5},
                    new Storage { Name = "RZ1", Description = "Pierwszy magazyn w Rzeszowie (pok.402 p.4)", LocationId = 4},
                    new Storage { Name = "RZ2", Description = "Drugi magazyn w Rzeszowie (pok.114 p.1)", LocationId = 4},
                    new Storage { Name = "GD1", Description = "Pierwszy magazyn w Gdansku (pok.268 p.2)", LocationId = 3},
                    new Storage { Name = "GD2", Description = "Drugi magazyn w Gdansku (pok.23 p.1)", LocationId = 3},
                    new Storage { Name = "FR1", Description = "Pierwszy magazyn we Frankfurcie (pok.78 p.2)", LocationId = 2},
                    new Storage { Name = "FR2", Description = "Drugi magazyn we Frankfurcie (pok.12 p.1)", LocationId = 2},
                    new Storage { Name = "LO1", Description = "Pierwszy magazyn w Londynie (pok.100 p.1)", LocationId = 1},
                    new Storage { Name = "LO2", Description = "Drugi magazyn w Londynie (pok.95 p.1)", LocationId = 1},
                };
                context.Storages.AddRange(storages);
                context.SaveChanges();
            }

            if (!context.Laptops.Any())
            {
                var laptops = new List<Laptop>
                {
                    new Laptop
                    {
                        Producer = "HP",
                        Name = "Laptop HP430",
                        SaleReason = "przebarwienia i artefakty na matrycy",
                        DestinationId = 3,
                        InterestId = 1,
                        Tested = false,
                        Price = 1500.90,
                        Quantity = 4,
                        ServiceTag = "HPXB569430ST",
                        AdminsToDo = "usunac haslo z biosu, zainstalowac pakiet biurowy",
                        InterfacePorts = "HDMI, USB2.0, USB3.0, Czytnik kart SD, RJ45, Audio-Out, Mic-In",
                        Comment = "niewielkie slady uzytkowania, niewielkie rozmiary sprzetu, bateria trzyma ok 3h",
                        Created = DateTime.Now,
                        StorageId = 1,
                        Processor = "Intel Core i5-8520U 1.7GHz",
                        MemoryAmount = 8,
                        GraphicsCard = "Intel Graphics 720",
                        DiskDrive = "SSD 240GB M.2, HDD 500GB",
                        ScreenResolution = "1366x760",
                        OperatingSystem = "Windows 10",
                        HasTouchScreen = false
                    },
                    new Laptop
                    {
                        Producer = "Toshiba",
                        Name = "Laptop Toshiba Satelite Pro R50-EC-10Z",
                        SaleReason = "awaria touchpada, pojawiające się bluescreen'y",
                        DestinationId = 3,
                        InterestId = 1,
                        Tested = true,
                        Price = 780.70,
                        Quantity = 1,
                        ServiceTag = "PT5A1E-16X01NPL",
                        AdminsToDo = "odinstalować aplikacje firmowe, odlaczyc domene logowania",
                        InterfacePorts = "HDMI, D-Sub(VGA), USB2.0, USB3.0, USB-C, RJ-45, Audio-Out, Mic-In, CD-DVD",
                        Comment = "laptop stosunkowo dużych rozmiarów oraz wagi, problemy z uciążliwymi niebieskimi ekranami",
                        Created = DateTime.Now,
                        StorageId = 2,
                        Processor = "Intel Core i3-7020U 2.3GHz",
                        MemoryAmount = 4,
                        GraphicsCard = "Intel Graphics 620",
                        DiskDrive = "HDD 500GB",
                        ScreenResolution = "1600x900",
                        HasTouchScreen = false
                    },
                    new Laptop
                    {
                        Producer = "Dell",
                        Name = "Laptop Dell Vostro 3590",
                        SaleReason = "zakupiono nowe modele, wykorzystywane przez administracje",
                        DestinationId = 3,
                        InterestId = 1,
                        Tested = false,
                        Price = 695.50,
                        Quantity = 10,
                        ServiceTag = "N2102VN3590EMEA01",
                        AdminsToDo = "odlaczyc domene logowania, wgrać program antywirusowy",
                        InterfacePorts = "HDMI, D-Sub(VGA), USB2.0, USB3.0, RJ45, Audio-Out, Mic-In, Thunderbolt, eSATA",
                        Comment = "wytarte klawisze, slaby czas pracy na baterii (caly czas byly na zasilaczach)",
                        Created = DateTime.Now,
                        StorageId = 3,
                        Processor = "Intel Core i3-10110U 2.1GHz",
                        MemoryAmount = 3,
                        GraphicsCard = "Intel UHD Graphics 620",
                        DiskDrive = "HDD 1TB",
                        ScreenResolution = "1920x1080",
                        OperatingSystem = "Microsoft Windows 10 Pro",
                        HasTouchScreen = false
                    }
                };
                context.Laptops.AddRange(laptops);
                context.SaveChanges();
            }

            if (!context.PCs.Any())
            {
                var pcs = new List<PC>
                {
                    new PC
                    {
                        Producer = "Lenovo",
                        Name = "Komputer Lenovo M92p",
                        SaleReason = "wymiana na nowe egzemplarze, dzialaja wolno",
                        DestinationId = 3,
                        Tested = false,
                        Price = 450.99,
                        Quantity = 12,
                        InterfacePorts = "D-Sub(VGA), DisplayPort, RJ-45, USB2.0, USB3.0, PS-2",
                        Processor = "Intel Core i3-3470 3.6GHz",
                        Comment = "sprzet przestarzaly technologicznie, bedzie smigal na linuxie",
                        AdminsToDo = "odinstalowac oprogramowanie firmowe, odkurzyc",
                        MemoryAmount = 2,
                        DiskDrive = "HDD 500GB",
                        OperatingSystem = "Windows 7 Pro",
                        GraphicsCard = "Intel HD Graphics 2500",
                        StorageId = 4,
                        InterestId = 1,
                        Created = DateTime.Now
                    },
                    new PC
                    {
                        Producer = "HP",
                        Name = "Komputer HP ELITE 800 G1",
                        SaleReason = "wymiana na nowe, uszkodzona stacja dyskow",
                        DestinationId = 3,
                        Tested = true,
                        Price = 390.99,
                        Quantity = 10,
                        InterfacePorts = "HDMI, DVI, PS-2, Audio-Out, Mic-In, USB3.0, USB2.0, FireWire",
                        Processor = "AMD Ryzen 7 3700X",
                        Comment = "dziala w miare ok, problem ze stacja dyskow",
                        AdminsToDo = "odinstalowac pakiet biurowy, odlaczyc od domeny",
                        MemoryAmount = 4,
                        DiskDrive = "HDD 256GB, SSD 128GB",
                        OperatingSystem = "Windows 10 Pro",
                        StorageId = 5,
                        InterestId = 1,
                        ExtensionsCards = "Karta dzwiekowa Creative Sound Blaster Z",
                        Created = DateTime.Now
                    }
                };
                context.PCs.AddRange(pcs);
                context.SaveChanges();
            }

            if (!context.OtherDevices.Any())
            {
                var otherDevices = new List<OtherDevice>
                {
                    new OtherDevice
                    {
                        Producer = "Dell",
                        Name = "Stacja dokujaca Dell Dock WD19TB",
                        SaleReason = "wymiana na nowe egzemplarze",
                        DestinationId = 2,
                        Tested = false,
                        Price = 532.60,
                        Quantity = 3,
                        Description = "Stacja dokujaca do laptopow Dell'a. Umozliwia naladowanie akumulatora do 80% pojemnosci w ciagu godziny",
                        Comment = "Stosunkowo duze rozmiary, szybko robi sie goraca",
                        AdminsToDo = "sprawdzic dzialanie wszystkich portow",
                        Features = "Ladowanie baterii laptopa, zewnetrzne gniazda rozszerzen",
                        InterfacePorts = "USB3.0 x3, USB3.1 x1, HDMI, RJ-45, DisplayPort, Audio-Out, Mic-In, Thunderbolt3",
                        StorageId = 6,
                        InterestId = 2,
                        Created = DateTime.Now
                    },
                    new OtherDevice
                    {
                        Producer = "ICY BOX",
                        Name = "Czytnik kart USB-C ICY BOX",
                        SaleReason = "nie jest uzywane w pracy",
                        DestinationId = 3,
                        Tested = false,
                        Price = 29,
                        Quantity = 5,
                        InterfacePorts = "Czytnik kart SD, USB-C",
                        Comment = "sprawdza sie w ultrabookach, gdzie nie mamy duzo wejsc USB",
                        AdminsToDo = "podlaczyc i sprawdzic czy dziala",
                        Description = "Czytnik kart pamieci z nowym zlaczem USB",
                        Features = "Przejsciowka na karty",
                        StorageId = 7,
                        InterestId = 1,
                        Created = DateTime.Now
                    }
                };
                context.OtherDevices.AddRange(otherDevices);
                context.SaveChanges();
            }

            if (!context.Monitors.Any())
            {
                var monitors = new List<Monitor>
                {
                    new Monitor
                    {
                        Producer = "Dell",
                        Name = "Monitor DELL P2419H",
                        SaleReason = "ulamane krawedzie obudowy",
                        DestinationId = 1,
                        Tested = false,
                        Price = 420.50,
                        Quantity = 6,
                        InterfacePorts = "D-Sub(VGA), HDMI, DisplayPort, USB2.0, USB3.0, USB3.1",
                        ScreenResolution = "1920x1080",
                        HasTouchScreen = false,
                        HasSpeakers = true,
                        Comment = "posiada sporo portow jak na monitor, mozliwosc obrotu o 360 stopni",
                        AdminsToDo = "podlaczyc do zasilania i sprawdzic czy dziala",
                        StorageId = 8,
                        InterestId = 2,
                        Refreshing = 60,
                        Contrast = "1000:1",
                        Matrix = "IPS",
                        Diagonal = 21.5,
                        Created = DateTime.Now
                    },
                    new Monitor
                    {
                        Producer = "iiyama",
                        Name = "iiyama G-Master G2530HSU Black Hawk",
                        SaleReason = "przebarwienia na matrycy, bad pixele",
                        DestinationId = 1,
                        Tested = true,
                        Price = 310.90,
                        Quantity = 10,
                        Diagonal = 24.5,
                        InterfacePorts = "D-Sub(VGA), HDMI, DisplayPort, Audio-Out, USB2.0",
                        ScreenResolution = "1600x900",
                        Comment = "wyswietlacz w kiepskim stanie, coraz mniejsze pokrycie ekranu",
                        StorageId = 9,
                        HasTouchScreen = true,
                        HasSpeakers = false,
                        InterestId = 3,
                        Contrast = "2000:1",
                        Matrix = "TN",
                        Refreshing = 75,
                        Created = DateTime.Now
                    }
                };
                context.Monitors.AddRange(monitors);
                context.SaveChanges();
            }
        }
    }
}