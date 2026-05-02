import { Adult, Kid } from "@/lib/types"
import { Audience } from "@/../prisma/generated/enums"

export class AudienceUtil {
  //---------- TYPE GUARDS ----------//
  isAdult(value: string): value is Adult {
    return value === Audience.WOMEN || value === Audience.MEN
  }

  isKid(value: string): value is Kid {
    return value === Audience.BOY || value === Audience.GIRL
  }

  isAudience(value: string): value is Audience {
    return value === Audience.MEN || value === Audience.WOMEN || value === Audience.BOY || value === Audience.GIRL
  }

  audiencesToLabel(audiences: Audience[]): string {
    let label = ""

    if (audiences.length === 1) {
      switch (audiences[0]) {
        case "MEN":
          label = "hommes"
          break
        case "WOMEN":
          label = "femmes"
          break
        case "BOY":
          label = "garçons"
          break
        case "GIRL":
          label = "filles"
          break
      }
    }

    if (audiences.length === 2) {
      if (this.isAdult(audiences[0]) && this.isAdult(audiences[1])) label = "adultes"
      if (this.isKid(audiences[0]) && this.isKid(audiences[1])) label = "enfants"
    }

    return label
  }

  audiencesToUrlParams(audiences: Audience[]): string | null {
    let params = null

    if (audiences.length === 1) {
      if (this.isAdult(audiences[0])) {
        params = audiences[0] === "MEN" ? "adults=MEN" : "adults=WOMEN"
      }
      if (this.isKid(audiences[0])) {
        params = audiences[0] === "BOY" ? "kids=BOY" : "kids=GIRL"
      }
    }

    if (audiences.length === 2) {
      if (this.isAdult(audiences[0]) && this.isAdult(audiences[1])) params = "adults=MEN,WOMEN"
      if (this.isKid(audiences[0]) && this.isKid(audiences[1])) params = "kids=BOY,GIRL"
    }

    return params
  }

  // labelToAudiences(label: string): Audience[] | null {
  //   let audiences: Audience[] | null = null

  //   switch (label) {
  //     case 'adults':
  //       audiences = [Audience.MEN, Audience.WOMEN]
  //       break
  //     case 'hommes':
  //       audiences = [Audience.MEN]
  //       break
  //     case 'femmes':
  //       audiences = [Audience.WOMEN]
  //       break
  //     case 'kids':
  //       audiences = [Audience.BOY, Audience.GIRL]
  //       break
  //     case 'boy':
  //       audiences = [Audience.BOY]
  //       break
  //     case 'girl':
  //       audiences = [Audience.GIRL]
  //       break
  //   }

  //   return audiences
  // }
}
