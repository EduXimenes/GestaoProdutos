﻿// <auto-generated />
using System;
using CRUDAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CRUDAPI.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("CRUDAPI.Models.Produto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("CNPJ")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CodFornecedor")
                        .HasColumnType("int");

                    b.Property<string>("DescFornecedor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DescProduto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DtFabricacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DtValidade")
                        .HasColumnType("datetime2");

                    b.Property<string>("Situacao")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("produtos");
                });
#pragma warning restore 612, 618
        }
    }
}
