#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models.user import User
from models.bud_tracker import BudTracker
from models.smoke_session import SmokeSession
from models.canna_gear import CannaGear
from models.strain import Strain

fake = Faker()


def create_users(num_users=4):
    users_to_add = []
    for _ in range(num_users):
        username = fake.user_name()
        email = fake.email()
        birthday = fake.date_of_birth(minimum_age=21, maximum_age=65)
        profile_pic = fake.image_url()
        password = fake.password()

        new_user = User(
            username=username,
            email=email,
            birthday=birthday,
            profile_pic=profile_pic,
        )

        new_user.password_hash = password
        users_to_add.append(new_user)

    db.session.add_all(users_to_add)
    db.session.commit()
    print(f"Database seeded with {len(users_to_add)} users!")


def generate_fake_bud_trackers(num_records, user_count, strain_count):
    for _ in range(num_records):
        bud_tracker = BudTracker(
            user_id=fake.random_int(min=1, max=user_count),
            strain_id=fake.random_int(min=1, max=strain_count),
            grower=fake.company(),
            dispensary=fake.company(),
            purchase_date=fake.date(),
            purchase_amount=f"{randint(1, 30)} grams",
            cost=randint(10, 300),
            rating=randint(1, 5),
            flavor=rc(["Earthy", "Citrus", "Sweet", "Pine", "Skunky"]),
            pic=fake.image_url(),
            my_effects=", ".join(
                fake.words(
                    nb=3,
                    ext_word_list=[
                        "Relaxed",
                        "Happy",
                        "Euphoric",
                        "Uplifted",
                        "Sleepy",
                    ],
                )
            ),
            in_stock=fake.boolean(),
        )
        db.session.add(bud_tracker)
    db.session.commit()
    print(f"Generated {num_records} BudTracker records.")


def generate_fake_smoke_sessions(num_records, user_count, bud_tracker_count):
    for _ in range(num_records):
        smoke_session = SmokeSession(
            user_id=fake.random_int(min=1, max=user_count),
            bud_id=fake.random_int(min=1, max=bud_tracker_count),
            date=fake.date_this_year().isoformat(),
            start_time=fake.time(),
            end_time=fake.time(),
            location=fake.address(),
            rating=randint(1, 5),
            pic=fake.image_url(),
            visible=fake.boolean(),
        )
        db.session.add(smoke_session)
    db.session.commit()
    print(f"Generated {num_records} SmokeSession records.")


def generate_fake_canna_gear(num_records, user_count):
    for _ in range(num_records):
        canna_gear = CannaGear(
            user_id=fake.random_int(min=1, max=user_count),
            gear_type=rc(["Vaporizer", "Pipe", "Bong", "Rolling Papers", "Grinder"]),
            brand=fake.company(),
            model=fake.word(),
            purchase_date=fake.date(),
            price=randint(10, 500),
            rating=randint(1, 5),
            pic=fake.image_url(),
            notes=fake.text(),
            visible=fake.boolean(),
        )
        db.session.add(canna_gear)
    db.session.commit()
    print(f"Generated {num_records} CannaGear records.")


def generate_fake_strains(num_records):
    for _ in range(num_records):
        strain = Strain(
            name=fake.word(),
            type=rc(["Indica", "Sativa", "Hybrid"]),
            potency=f"{randint(5, 30)}%",
            effects=", ".join(
                fake.words(
                    nb=3,
                    ext_word_list=["Relaxing", "Energizing", "Calming", "Stimulating"],
                )
            ),
            flavor=rc(["Earthy", "Citrus", "Sweet", "Pine", "Skunky"]),
            description=fake.text(),
            pic=fake.image_url(),
        )
        db.session.add(strain)
    db.session.commit()
    print(f"Generated {num_records} Strain records.")


if __name__ == "__main__":
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        BudTracker.query.delete()
        SmokeSession.query.delete()
        CannaGear.query.delete()
        Strain.query.delete()

        create_users(4)
        generate_fake_strains(10)

        generate_fake_strains(10)
        strain_count = db.session.query(Strain).count()

        generate_fake_bud_trackers(10, 4, strain_count)
        generate_fake_canna_gear(10, 4)

        bud_tracker_count = db.session.query(BudTracker).count()
        generate_fake_smoke_sessions(10, 4, bud_tracker_count)

        print("Seed complete!")
